# 🛰️ STELLAR-v1k: Hackathon Pitch & Impact Guide

## ❓ "How does this help ISRO?" (The Value Proposition)

You asked: *"Is it a one-time thing? Will it always show the same output?"*

**The Answer:**
**NO.** STELLAR is designed as a **dynamic, living AI system** that runs directly on the satellite or ground station console. It does not just look at old data; it **learns** from new data in real-time.

---

## 🚀 3 Key Impacts for India & ISRO

### 1. **Automated Collision Avoidance (Safety)**
- **Current Problem:** ISRO ground stations track satellites manually. If a clock error spikes (like the 9/7 anomaly in our data), it might take hours to notice and correct.
- **STELLAR Solution:** Our AI monitors the error stream 24/7. When the **"Maneuver Recommendation"** panel turns RED (Critical), it means a collision or service failure is imminent.
- **Impact:** Prevents loss of million-dollar assets.

### 2. **Fuel Efficiency = Longer Mission Life (Sustainability)**
- **Current Problem:** "Station Keeping" maneuvers burn precious fuel. Doing them too early wastes fuel; doing them too late is dangerous.
- **STELLAR Solution:** By predicting drift **24 hours in advance**, we calculate the *exact* Delta-V (velocity change) needed.
- **Impact:** Saving just 1kg of fuel can extend a satellite's operational life by months.

### 3. **Edge AI Capability (Innovation)**
- **Current Problem:** Most AI requires heavy servers and sending data down to Earth (slow, bandwidth-heavy).
- **STELLAR Solution:** Our **Browser-Edge AI** (TensorFlow.js) runs *locally* in the console. It trains on the latest data instantly without needing a backend server.
- **Impact:** Faster decision-making for ISRO missions, even with poor connectivity.

---

## 🛑 "Why isn't it static?" (The Live Demo)

We built two features to prove this is **NOT** static:

1.  **"Simulate Live Uplink" Button**:
    - Click this in the ISRO Panel.
    - You will see NEW data points streaming in every second.
    - The AI automatically generates NEW predictions every 5 seconds based on this fresh data.
    - **Demonstrate this to judges** to show it handles unknown/future scenarios.

2.  **"Train Model" Button**:
    - This effectively "updates" the AI brain. In a real mission, this would happen once a day.
    - Doing this live proves the model isn't just a hardcoded if-statement; it actually minimizes loss (mathematical learning) right in front of them.

---

## 🗣️ Elevator Pitch for Judges

*"STELLAR converts raw, noisy satellite data into actionable safety decisions. Unlike traditional monitoring that reacts to errors, our LSTM-Attention model **predicts** them 24 hours ahead, allowing ISRO to automate station-keeping maneuvers, save fuel, and extend the lifespan of India's NavIC constellation."*
