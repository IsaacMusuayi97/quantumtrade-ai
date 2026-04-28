from fastapi import FastAPI
import yfinance as yf
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv("backend/.env")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                    "https://quantumtrade-ai-1.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "QuantumTrade AI Running"}

@app.get("/backtest")
def backtest(stock: str = "AAPL", period: str = "5y"):
    data = yf.download(stock, period=period)

    closes = data["Close"].squeeze()

    ma50 = closes.rolling(50).mean()
    ma200 = closes.rolling(200).mean()

    in_position = False
    buy_price = 0

    trades = 0
    wins = 0
    
    starting_balance = 10000
    balance = starting_balance

    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    chart_data = []

    for i in range(len(closes)):

        if i < 200:
            continue

        price = float(closes.iloc[i])


        #BUY
        if not in_position and ma50.iloc[i] > ma200.iloc[i]:
            in_position = True
            buy_price = price

        # SELL
        elif in_position and ma50.iloc[i] < ma200.iloc[i]:
            in_position = False
            trades += 1

            profit = price - buy_price
            balance += profit

            if profit > 0:
                wins += 1

        if i % 21 == 0:
            current_return = ((balance - starting_balance) / starting_balance) * 100

            month_index = len(chart_data) % 12

            chart_data.append({
                "month": months[month_index],
                "return": round(current_return, 2)
            })        

    win_rate = 0

    if in_position:
        final_price = float(closes.iloc[-1])
        profit = final_price - buy_price

        balance += profit
        trades += 1

        if profit > 0:
            wins += 1
    
    if data.empty:
        return {"error": "No data found"}

    if trades > 0:
        win_rate = (wins / trades) * 100

    return_pct = ((balance - starting_balance) / starting_balance) * 100    



    aiObject = {
    "stock": stock.upper(),
    "period": period,
    "ending_balance": round(balance, 2),
    "return_pct": round(return_pct, 2),
    "trades": trades,
    "win_rate": round(win_rate, 2)
    }

    client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY")
    )

    response = client.responses.create(
        model="gpt-5.2",
        instructions="""
        Analyze these backtest results.
        Write two concise professional paragraph.
        Mention strengths, weaknesses, and recommendation.
        """,
        input=str(aiObject)
    )

    aiResponse = response.output_text

    return {
        "stock": stock.upper(),
        "period": period,
        "starting_balance": starting_balance,
        "ending_balance": round(balance, 2),
        "return_pct": round(return_pct, 2),
        "trades": trades,
        "wins": wins,
        "win_rate": round(win_rate, 2),
        "chart_data":chart_data,
        "ai_analysis": aiResponse
    }