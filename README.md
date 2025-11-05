# Overview - [ Work in Progress ]
- Vidflow is online platform for media conversion
- It has following features
    - Current Features
        -  Extract mp3 from mp4
    - Future additions:
        - Autosize video to 9:16 or 1:1 for social media
        - Video Resolution Resize (Mp4)

## Tech Stack:
- **Python + FastAPI**: API for handling the requests and responses
- **Go + Gin**: Efficient handling of CPU intensive Video Conversion jobs
- **Typescript + NextJs + React + JavaScript**: For User friendly UI
- **PostGres** - Database used for persisting conversion jobs
- **Redis Streams**: Used as microservices communication channel - lightweight alternative to Kafka/Rabbitmq
- **Docker**: Deployment and Infrastructure setup
- **FFMPEG**: Media Conversion
- **HTML/CSS/Tailwind**: Frontend of Application


## Screenshots:

### Homepage
![Homepage](https://github.com/lakhbawa/vidflow/blob/main/screenshots/screencapture-localhost-2025-11-05-15_41_49.png)

### Conversion Form
![Conversion Form](https://github.com/lakhbawa/vidflow/blob/main/screenshots/screencapture-localhost-video-conversion-2025-11-05-15_42_13.png)

### Conversion Download
![Conversion Download](https://github.com/lakhbawa/vidflow/blob/main/screenshots/screencapture-localhost-video-status-be99864e-c0a8-4660-9d90-f3ed589de8ea-2025-11-05-15_42_26.png)

## Setup Instructions:
- Clone the repo
- Run `docker-compose up`
- Go to http://localhost
- Click on Upload Video and select a video file
- Click on Convert and wait for the conversion to complete
- Click on Download and download the converted video
## Note:
This project is built to showcase my proficiency in Python, Go, FastAPI , Gin, React and NextJs, highlighting how these technologies can be integrated to create a full-stack web application.
