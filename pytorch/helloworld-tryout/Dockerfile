# Use the official PyTorch image as the base image
FROM pytorch/pytorch:latest

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY app /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Set the PYTHONPATH environment variable to include the current directory
ENV PYTHONPATH "${PYTHONPATH}:/app"

# Run the "hello_world.py" script when the container launches
CMD ["python", "hello_world.py"]
