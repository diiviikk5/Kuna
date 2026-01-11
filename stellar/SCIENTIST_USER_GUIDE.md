# STELLAR-v1k Scientist User Guide

## 📋 Getting Started

Welcome to STELLAR-v1k - your complete ML workflow platform for GNSS satellite error prediction. This guide will walk you through the entire process from data upload to model deployment.

### System Requirements

- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+
- **JavaScript**: Must be enabled
- **GPU**: WebGL 1.0+ support recommended (for faster training)
- **Data Format**: CSV file with satellite ephemeris error data

---

## 🚀 Quick Start (5 Minutes)

### Option 1: Use Demo Data

1. Navigate to `/forecast-lab`
2. Click "ARCHITECTURE_NODE" tab to view model details
3. Click "TRAINING_WINDOW" tab and click "EXECUTE_TRAINING_RUN"
4. Watch the model train for ~30 seconds with real-time loss curve

### Option 2: Upload Your Data (Recommended)

1. Navigate to `/scientist-workflow`
2. Follow the 5-step workflow detailed below

---

## 📖 Complete Workflow Guide

### Step 1: Upload Your Data

#### What You Need

A CSV file containing satellite ephemeris error data with the following columns:

| Column | Description | Example |
|---------|-------------|----------|
| `utc_time` | Timestamp | "1/1/2025 0:00" |
| `x_error (m)` | Radial error in meters | 0.523456 |
| `y_error (m)` | Along-track error in meters | 0.345678 |
| `z_error (m)` | Cross-track error in meters | -0.123456 |
| `satclockerror (m)` | Clock bias error in meters | 1.234567 |

#### Supported Alternative Column Names

The system automatically recognizes alternative column names:

- **Time**: `time`, `timestamp`, `datetime`, `utc`, `date`
- **Radial**: `radial`, `x_error`, `xerr`, `radial_error`
- **Along**: `along`, `y_error`, `yerr`, `along_track`, `along_error`
- **Cross**: `cross`, `z_error`, `zerr`, `cross_track`, `cross_error`
- **Clock**: `clock`, `clock_error`, `satclock`, `clock_bias`

#### Upload Process

1. **Drag and Drop**: Drag your CSV file onto the upload area
   OR
   **Click to Browse**: Click the upload area to open file selector

2. **Automatic Validation**:
   - File format validation (must be CSV)
   - Column validation (all required columns present)
   - Data format validation (numeric values)
   - Timestamp format validation

3. **Data Preview**:
   - First 50 rows displayed in table format
   - Scrollable to review all data points

4. **Statistics Dashboard**:
   - Total sample count
   - Time span (days covered)
   - Quality score (0-100)
   - Per-feature statistics (mean, std, range, outliers)

5. **Quality Recommendations**:
   - Data quality assessment (EXCELLENT, GOOD, FAIR, POOR)
   - Automatic recommendations for improvement
   - Outlier detection and alerts

#### Troubleshooting

| Problem | Solution |
|---------|----------|
| "Invalid timestamp format" | Ensure dates are in "M/D/YYYY H:MM" format |
| "Missing required columns" | Check column names match required or alternative names |
| "Non-numeric values detected" | Check that error columns contain only numbers |
| "Insufficient data points" | Need at least 100 rows, recommended 500+ |

---

### Step 2: Configure Training Parameters

#### Understanding Hyperparameters

##### Epochs

Number of times the model sees the entire dataset.

| Value | Use Case | Training Time | Expected Accuracy |
|-------|-----------|----------------|-------------------|
| 10 | Quick test/demo | ~30 seconds | Lower accuracy |
| 25 | Fast training | ~1 minute | Good accuracy |
| 50 (Recommended) | Standard training | ~2 minutes | High accuracy |
| 100 | Thorough training | ~4 minutes | Maximum accuracy |

**Guideline**: Start with 50 epochs, increase if loss is still decreasing.

##### Batch Size

Number of samples processed before updating model weights.

| Value | Use Case | Memory Usage |
|-------|-----------|---------------|
| 16 (Small) | Limited RAM | Lower |
| 32 (Medium - Recommended) | Balanced | Medium |
| 64 (Large) | High RAM | Higher |
| 128 (XL) | GPU available | Highest |

**Guideline**: Default 32 works well for most browsers.

##### Learning Rate

How fast the model learns. Smaller = slower but more stable; Larger = faster but risk of divergence.

| Value | Use Case | Convergence Speed |
|-------|-----------|-------------------|
| 0.0001 (Conservative) | Stable training, minimal updates | Slow |
| 0.001 (Recommended) | Balanced speed and stability | Medium |
| 0.01 (Aggressive) | Fast learning, risk of overshooting | Fast |

**Guideline**: Start with 0.001. If loss oscillates, decrease to 0.0001.

##### Validation Split

Portion of data used for validation (not training).

| Value | Use Case | Training Data |
|-------|-----------|---------------|
| 10% (Most Data) | Maximum training data | 90% |
| 20% (Balanced - Recommended) | Standard practice | 80% |
| 30% (More Validation) | Rigorous validation | 70% |

**Guideline**: 20% is recommended for balanced training/validation.

#### Dataset Summary Panel

Before training, review:
- **Total Samples**: Number of data rows in your CSV
- **Duration**: Time span in days covered by your data
- **Train Samples**: Number of rows used for training
- **Val Samples**: Number of rows used for validation

**Recommendation**: Ideally have at least 500+ samples spanning 7+ days.

---

### Step 3: Train the Model

#### What Happens During Training

1. **Data Preprocessing**:
   - Normalization (Z-score) for all features
   - Sequence creation (96 time steps per sequence)
   - Train/validation split (80/20 default)

2. **Model Forward Pass**:
   - LSTM layers process sequential data
   - Attention mechanism learns temporal dependencies
   - Dense layers transform features

3. **Loss Calculation**:
   - Mean Squared Error (MSE) computed between predictions and targets
   - Backpropagation computes gradients
   - Adam optimizer updates weights

4. **Real-Time Updates**:
   - Loss curve updates after each epoch
   - Training and validation loss tracked separately
   - RMSE displayed for interpretability

#### Monitoring Training

##### Loss Curve Chart

- **Green line (Train Loss)**: Should decrease monotonically
- **Orange line (Val Loss)**: Should decrease but may plateau
- **Gap between lines**: Small gap = good generalization; Large gap = overfitting

##### Training Console Log

Real-time logs show:
- Epoch completion: `Epoch 5/50 - Loss: 0.002345 | Val Loss: 0.002456`
- Training progress and metrics
- Error messages (if any)

##### Progress Bar

Shows overall training completion percentage.

#### Best Practices

1. **Watch for Overfitting**:
   - Train loss decreases but val loss increases
   - Solution: Reduce epochs, add more data, use regularization

2. **Watch for Underfitting**:
   - Both train and val loss remain high
   - Solution: Increase epochs, increase model complexity

3. **Stop Training Early**:
   - If loss plateaus for 10+ epochs
   - Click "HALT_EXECUTION" to stop

4. **Training Time Expectations**:
   - 10 epochs: ~30 seconds
   - 50 epochs: ~2 minutes
   - 100 epochs: ~4 minutes
   - Time varies with dataset size and browser performance

---

### Step 4: Evaluate Model Performance

#### What Evaluation Does

After training completes, the system evaluates the model on **unseen test data**:

1. **Run Predictions**: Model predicts on test sequences
2. **Compare to Actual**: Calculate errors vs ground truth
3. **Compute Metrics**: RMSE, MAE, R², MAPE
4. **Generate Visualizations**: Time series, scatter, residuals

#### Understanding Metrics

##### RMSE (Root Mean Squared Error)

- **Definition**: √(Σ(predictions - actual)² / n)
- **Interpretation**: Lower is better (0 = perfect)
- **Typical range**: 0.01 - 1.0 (units match your data)
- **Guideline**: <0.5 is excellent

##### MAE (Mean Absolute Error)

- **Definition**: Σ|predictions - actual| / n
- **Interpretation**: Average absolute error magnitude
- **Typical range**: 0.01 - 1.0
- **Guideline**: <0.3 is excellent

##### R² Score (Coefficient of Determination)

- **Definition**: 1 - (SS_res / SS_tot)
- **Interpretation**: How well model explains variance
- **Range**: -∞ to 1 (higher is better)
- **Guideline**:
  - >0.9: Excellent
  - 0.7-0.9: Good
  - 0.5-0.7: Fair
  - <0.5: Poor

##### MAPE (Mean Absolute Percentage Error)

- **Definition**: Σ|(actual - predicted) / actual| * 100 / n
- **Interpretation**: Average percentage error
- **Typical range**: 1-10%
- **Guideline**: <5% is excellent

#### Visualizations

##### Time Series Comparison

- **Green line**: Actual values
- **Orange dashed line**: Predicted values
- **Use case**: Visualize how well predictions match actual over time
- **Look for**: Systematic biases, phase shifts, amplitude errors

##### Scatter Plot

- **X-axis**: Actual values
- **Y-axis**: Predicted values
- **Diagonal line**: Perfect prediction (where actual = predicted)
- **Use case**: Check for systematic errors
- **Look for**: Points clustering around diagonal = good; spread = poor

##### Residuals Plot

- **X-axis**: Sample index
- **Y-axis**: Residual (actual - predicted)
- **Zero line**: Perfect prediction
- **Use case**: Check for patterns in errors
- **Look for**: Random scatter around zero = good; patterns = missing features

#### Per-Feature Analysis

Evaluate each error component separately:
- **Radial Error**: Prediction accuracy for radial position error
- **Along-Track Error**: Prediction accuracy for along-track position error
- **Cross-Track Error**: Prediction accuracy for cross-track position error
- **Clock Bias**: Prediction accuracy for satellite clock drift

#### Interpreting R² Quality Indicator

- **EXCELENT (R² > 0.9)**: Model explains most variance; ready for deployment
- **GOOD (R² 0.7-0.9)**: Model performs well; consider more training data
- **FAIR (R² 0.5-0.7)**: Model has moderate performance; review data quality
- **POOR (R² < 0.5)**: Model struggles; check data quality, try different hyperparameters

#### Export Predictions

Click "EXPORT_DATA" to download:
- **File Format**: CSV
- **Filename**: `predictions-{timestamp}.csv`
- **Contents**: Timestamp, actual values, predicted values, errors

---

### Step 5: Deploy and Export Model

#### Export Options

##### Export Model (JSON)

- **What it contains**: Full model architecture + trained weights
- **File size**: ~200-500 KB
- **Use case**: Deploy to production, share with team, archive
- **Filename**: `stellar-model-{timestamp}.json`

##### Download Training History (CSV)

- **What it contains**: Loss and metrics for each epoch
- **Use case**: Analyze training dynamics, report generation
- **Filename**: `training-history-{timestamp}.csv`

##### Download Predictions (CSV)

- **What it contains**: All test set predictions
- **Use case**: Further analysis, integration with other tools
- **Filename**: `predictions-{timestamp}.csv`

##### Model Report (TXT)

- **What it contains**: Complete training report with all metrics
- **Use case**: Documentation, compliance, presentation
- **Filename**: `model-report-{timestamp}.txt`

#### Load Saved Model

1. Click "CLICK_TO_UPLOAD_MODEL"
2. Select previously exported JSON file
3. Model loads and is ready for predictions
4. Useful for:
   - Sharing trained models between team members
   - Reusing models without retraining
   - Version control of model iterations

#### Model Management

View all saved models:
- **Model Name/ID**: Identifier
- **Data Source**: Original dataset used
- **Epochs**: Training duration
- **Date**: When saved
- **Delete**: Remove from saved models

---

## 🎯 Use Cases for ISRO Scientists

### Use Case 1: Collision Avoidance

**Scenario**: Detect potential collisions 24 hours in advance

**Workflow**:
1. Upload satellite ephemeris data for past 7 days
2. Train model with standard hyperparameters
3. Evaluate model (target R² > 0.9)
4. Use model to predict next 24 hours of errors
5. Apply corrections to collision detection algorithms

**Expected Outcome**: Earlier collision warnings, reduced false alarms

### Use Case 2: Station Keeping Optimization

**Scenario**: Optimize fuel-efficient orbit corrections

**Workflow**:
1. Upload high-frequency data (15-min intervals)
2. Train with 100 epochs for maximum accuracy
3. Export model predictions
4. Calculate optimal correction maneuvers based on predictions
5. Compare with traditional methods

**Expected Outcome**: 10-20% fuel savings, extended mission life

### Use Case 3: Anomaly Detection

**Scenario**: Detect satellite malfunctions early

**Workflow**:
1. Upload nominal operational data
2. Train model on normal behavior
3. Monitor real-time predictions vs actuals
4. Set anomaly threshold (e.g., prediction error > 3σ)
5. Alert when anomalies detected

**Expected Outcome**: Faster malfunction detection, reduced downtime

### Use Case 4: Data Quality Assessment

**Scenario**: Validate new satellite data sources

**Workflow**:
1. Upload data from new source
2. Review data quality score and statistics
3. Train model and evaluate
4. Compare accuracy with trusted sources
5. Identify systematic biases or errors

**Expected Outcome**: Improved data validation processes

---

## 💡 Tips and Best Practices

### Data Preparation

1. **Ensure Data Quality**:
   - Remove obvious outliers (> 5σ) before training
   - Handle missing values (interpolate or remove)
   - Check for timestamp continuity

2. **Optimal Dataset Size**:
   - Minimum: 100 samples
   - Recommended: 500+ samples
   - Ideal: 1000+ samples spanning multiple orbit cycles

3. **Time Coverage**:
   - Cover at least 7 days for learning orbital patterns
   - Multiple orbit cycles improve temporal learning
   - Seasonal variations help generalization

### Training Optimization

1. **Start Simple**:
   - Use default hyperparameters first
   - Train with 25 epochs for quick baseline
   - Evaluate and iterate

2. **Monitor Overfitting**:
   - Watch validation loss closely
   - Stop if val loss starts increasing
   - Reduce epochs or add data if overfitting

3. **Browser Performance**:
   - Close other tabs during training
   - Use Chrome for best TensorFlow.js performance
   - Enable hardware acceleration in browser settings

### Model Interpretation

1. **Check Consistency**:
   - All 4 error components should have similar performance
   - Large discrepancy indicates data issues

2. **Verify Predictions**:
   - Compare first few predictions manually
   - Check for realistic error magnitudes
   - Validate uncertainty bounds

3. **Continuous Improvement**:
   - Retrain weekly with new data
   - Track model performance over time
   - Ensemble multiple models for robustness

---

## ⚠️ Common Issues and Solutions

### Issue 1: "Training stuck at same loss"

**Possible Causes**:
- Learning rate too low (0.0001)
- Model too simple for data complexity
- Data has no learnable patterns

**Solutions**:
- Increase learning rate to 0.001 or 0.01
- Add more epochs
- Check data quality

### Issue 2: "Validation loss much higher than training"

**Possible Causes**:
- Overfitting (model memorizing training data)
- Not enough training data
- Train/val split unrepresentative

**Solutions**:
- Reduce epochs
- Increase validation split to 30%
- Collect more data
- Use data augmentation

### Issue 3: "R² score is negative"

**Possible Causes**:
- Model performs worse than simple mean prediction
- Data has high noise
- Wrong data preprocessing

**Solutions**:
- Verify data format and quality
- Check for preprocessing errors
- Simplify model architecture

### Issue 4: "Browser crashes during training"

**Possible Causes**:
- Dataset too large (> 10,000 rows)
- Out of browser memory
- WebGL not working

**Solutions**:
- Reduce dataset size (sample or aggregate)
- Increase validation split
- Restart browser
- Check browser console for WebGL errors

---

## 📚 Additional Resources

### Documentation

- [Technical Documentation](TECHNICAL_DOCUMENTATION.md) - Complete technical specs
- [README](README.md) - Project overview and features
- [Hackathon Pitch](HACKATHON_PITCH.md) - Value proposition and impact

### Code

- [GitHub Repository](https://github.com/diiviikk5/Stellar-v1k) - Full source code
- [Live Demo](https://stellar-wine.vercel.app) - Try the system live

### Support

- **Email**: divik.arora@dce.edu (Team Lead)
- **Institution**: Dronacharya College of Engineering
- **Project**: STELLAR-v1k GNSS Error Forecasting System

---

## 🔗 Quick Reference

### Keyboard Shortcuts

- **Tab**: Navigate between form fields
- **Enter**: Submit forms
- **Escape**: Close modals/alerts

### File Size Limits

- **CSV files**: Maximum 50MB
- **Recommended**: <10MB for optimal performance
- **Sample size**: 500-2000 rows ideal

### Performance Targets

- **RMSE**: < 0.5 ns
- **MAE**: < 0.3 ns
- **R²**: > 0.9
- **MAPE**: < 5%
- **Training Time**: < 5 minutes (50 epochs)

---

*Last Updated: January 2026 | Version: 1.0.0*

**Built with ❤️ for ISRO Scientists and GNSS Operators Worldwide**
