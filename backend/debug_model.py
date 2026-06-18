import os
import tensorflow as tf
import traceback

MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'best_efficientnet_b0_finetune.keras')
MODEL_PATH = os.path.abspath(MODEL_PATH)

print(f"TensorFlow version: {tf.__version__}")
print(f"Model path: {MODEL_PATH}")
print(f"File exists: {os.path.exists(MODEL_PATH)}")

try:
    model = tf.keras.models.load_model(MODEL_PATH, compile=False)
    print("Model loaded successfully!")
    print(f"Input shape: {model.input_shape}")
    print(f"Output shape: {model.output_shape}")
    model.summary()
except Exception as e:
    print(f"Error loading model: {e}")
    traceback.print_exc()
