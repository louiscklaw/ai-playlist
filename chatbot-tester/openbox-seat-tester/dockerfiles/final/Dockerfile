FROM logickee/openbox-seat-tester-final

ARG ANDROID_API_LEVEL=25
ENV ANDROID_API_LEVEL ${ANDROID_API_LEVEL}

COPY ./etc/ /etc/

ADD ./etc/supervisord_run.sh /etc/supervisord_run.sh
RUN chmod +x /etc/supervisord_run.sh

# WORKDIR /root

# NOTE: chrome may fail running root with user-data-dir and --no-sandbox option.
# NOTE: finding out why


# RUN useradd logic
# RUN mkdir -p /home/logic
# WORKDIR /home/logic
# USER 1000:1000

RUN groupadd logic
RUN useradd -u 1000 -g logic \
  -d /home/logic \
  -s /bin/bash -p $(echo blablabla | openssl passwd -1 -stdin) logic
WORKDIR /home/logic

# TODO: remove me
RUN cp /root/.bashrc /home/logic/.bashrc
# RUN touch /home/logic/.bashrc


# # NOTE: corelated to the supervisiord config file
ENV HOME /home/logic

# # NOTE: changing to user will fail vncserver
RUN mkdir -p /home/logic/.vnc
RUN echo 123456 | vncpasswd -f > /home/logic/.vnc/passwd
RUN chmod 600 /home/logic/.vnc/passwd
# # NOTE: vnc setup done

ADD etc/xdg/pcmanfm /home/logic/.config/pcmanfm

RUN chown 1000:1000 -R /home/logic

RUN mkdir -p /installed &&  touch /installed/final_done

USER 1000

CMD ["/etc/supervisord_run.sh"]
