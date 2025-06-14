FROM node:latest

RUN apt-get update && \
    apt-get install -y git ffmpeg && \
    apt-get clean

WORKDIR /data

RUN git config --global --add safe.directory /data
RUN git clone https://github.com/Lyall-A/Lyric-Tagger.git /data

CMD git pull && node .
