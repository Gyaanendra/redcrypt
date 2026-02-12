FROM python:3
WORKDIR /app
COPY . .
ARG PASS
ENV PASS=$PASS
RUN pip install -r requirements.txt
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 8000
CMD ["/entrypoint.sh"]