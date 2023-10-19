# Code citation: Team Geo Jobs at https://gitlab.com/sarthaksirotiya/cs373-idb

# FROM ubuntu:latest
FROM python:latest
ENV DEBIAN_FRONTEND=noninteractive

# https://forums.docker.com/t/hash-sum-mismatch-writing-more-data-as-expected/45940/3
# Uncomment this line and follow this if you have the same issue
# COPY ./badproxy /etc/apt/apt.conf.d/99fixbadproxy

RUN apt-get update -y
RUN apt-get install -y python3
RUN apt-get install -y python3-pip python3-dev build-essential vim
RUN apt-get -y install nginx

COPY . usr/src/backend
COPY requirements.txt usr/src/backend/requirements.txt

WORKDIR /usr/src/backend

RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

# EXPOSE 8080
# COPY . .

# CMD ["gunicorn", "wsgi:app", "-w 2", "-b 0.0.0.0:8080", "-t 30"]

EXPOSE 80

CMD ["python3", "waitress_server.py"]


# # CMD bash
# # docker compose 
# ENTRYPOINT ["python3"]
# CMD ["app.py"]
# CMD ["python3", "waitress_server.py"]
