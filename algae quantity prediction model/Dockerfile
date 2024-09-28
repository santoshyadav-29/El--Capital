# Dockerfile

# Use the official Python image from Docker Hub
FROM python:3.9

# Create a user and set up the environment
RUN useradd -m -u 1000 user
USER user
ENV PATH="/home/user/.local/bin:$PATH"

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file to the working directory
COPY --chown=user ./requirements.txt requirements.txt

# Install the Python dependencies
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy the entire project into the container's working directory
COPY --chown=user . /app

# Expose port 7860
EXPOSE 7860

# Command to run the FastAPI app using Uvicorn
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]