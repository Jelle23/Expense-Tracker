# 💰 Personal Finance Tracker

A simple yet powerful Angular application to help you **track income and expenses**, set **financial goals**, and visualize your **progress** toward those goals — all stored locally in your browser.

![screenshot](screenshot.png) <!-- Optional: Replace with actual image path -->

---

## ✨ Features

- ✅ Add, edit, and delete **transactions** (income & expenses)
- 📅 Filter transactions by **month** or **category**
- 🎯 Create financial **goals** with target amounts
- 📊 Automatically link **transactions to goals**
- 🌈 Dynamic progress bars with color indicators
- 💾 Data persistence via **localStorage** (no backend needed)

---

## 🚀 Tech Stack

- **Angular** (Standalone Components)
- **TypeScript**
- **RxJS (light usage)**
- **HTML / CSS**
- **localStorage** (for persistent data)
- Custom **pipes** and **services** for organization

---

## 📦 Setup & Installation

```bash
# Clone the repository
git clone https://github.com/your-username/personal-finance-tracker.git
cd personal-finance-tracker

# Install dependencies
npm install

# Start the development server
ng serve
Visit http://localhost:4200 in your browser to use the app.

🧠 Usage
Add a Transaction

Select type (income/expense)

Choose a category

Enter amount and description

Create a Goal

Set title and target amount

Automatically updates when transactions with the Goals category are added

Track Progress

View how much you’ve saved toward each goal

Color-coded progress (Red < 40%, Orange < 80%, Green ≥ 80%)

📁 Project Structure (Overview)
css
Kopiëren
Bewerken
src/
├── app/
│   ├── components/
│   │   ├── transaction/
│   │   └── goals/
│   ├── services/
│   └── pipes/
├── assets/
├── styles.css
└── main.ts
✅ Todo / Improvements
Add data export/import option

Add authentication for multi-user support

Add charts and dashboards

Add recurring transactions

Dark mode support

📄 License
MIT License © Your Name

🙌 Acknowledgements
Inspired by personal finance tools and budgeting apps like YNAB, PocketGuard, and traditional spreadsheets.
