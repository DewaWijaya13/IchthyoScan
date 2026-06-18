import os
import tensorflow as tf

MODEL_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'best_efficientnet_b0_finetune.keras'))
print("Loading model from:", MODEL_PATH)

try:
    model = tf.keras.models.load_model(MODEL_PATH, compile=False)
    print("Model loaded successfully natively!")
    print(f"Input shape: {model.input_shape}")
    print(f"Output shape: {model.output_shape}")
except Exception as e:
    import traceback
    print(f"Error loading model natively: {e}")
    traceback.print_exc()
