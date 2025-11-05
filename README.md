# Overview - [ Work in Progress ]
- Vidflow is online platform for media conversion
- It has following features
    - Extract mp3 from mp4
    - Autosize video to 9:16 or 1:1 for social media
    - Video Resolution Resize (Mp4)

## Tech Stack:
- **Python + FastAPI**: API for handling the requests and responses
- **Go + Gin**: Efficient handling of CPU intensive Video Conversion jobs
- **Typescript + NextJs + React + JavaScript**: For User friendly UI
- **PostGres** - Database used for persisting conversion jobs
- **Redis**: Fast DB to establish communication between FastAPI and microservices such as Go+Gin
- **Docker**: Deployment and Infrastructure setup
- **FFMPEG**: Media Conversion
- **HTML/CSS/Tailwind**: Frontend of Application

## API Paths
- POST /api/conversion/:action{mp4tomp3,resize}
- GET /api/conversion/:conversion_id/download
- DELETE /api/conversion/:conversion_id
## Frontend Paths
- / - Homepage with Tabbed Form which shows fields for different kind of conversions

## Tables
- **users**
    - uuid
    - name: nullable
- **conversions**
    - uuid
    - from_format
    - to_format
    - original_path: string
    - final_path: string
    - user_id
    - status
## Task Pipeline
- ~Setup Environment for everything~
- Create homepage with simple form for mp4 to mp3 conversion
- Create API endpoint that takes the user input and media and persists in db and local storage

## Screenshots:
![Homepage](https://github.com/lakhbawa/vidflow/blob/main/screenshots/vidflow-homepage.png)
![Conversion Form](https://github.com/lakhbawa/vidflow/blob/main/screenshots/video-conversion-form.png)

![Conversion Download](https://github.com/lakhbawa/vidflow/blob/main/screenshots/Converted-video-download-screen.png)

## Setup Instructions:
- Clone the repo
- Run `docker-compose up`
- Go to http://localhost
- Click on Upload Video and select a video file
- Click on Convert and wait for the conversion to complete
- Click on Download and download the converted video
## Note:
This project is built to showcase my proficiency in Python, Go, FastAPI , Gin, React and NextJs, highlighting how these technologies can be integrated to create a full-stack web application.