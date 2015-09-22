import datetime

from django.conf import settings

dt = datetime.datetime

# the name of the file to read/write last submission
FILE_NAME = 'last.txt'


class TimeCheck:

    def __init__(self):
        self.now = dt.now()
        self.last = self.now
        self.ready = False

    def is_ready(self):
        """
        Checks if the current time is further from the last check
        than the specified interval.
        :return True if enough time has passed; otherwise False.
        """
        try:
            with open(FILE_NAME) as f:
                time_str = '%Y-%m-%d %H:%M:%S.%f'
                self.last = dt.strptime(f.read().strip(), time_str)
        # if no file is found, set a time way in the past to trigger the email
        except FileNotFoundError:
            self.last = dt.strptime('2000-01-01', '%Y-%m-%d')

        # update the file with the new current time
        # and return whether the elapsed time is large enough
        with open(FILE_NAME, 'w') as f:
            f.write(str(self.now))
        return (self.now - self.last) > settings.EMAIL_INTERVAL


if __name__ == '__main__':
    print(TimeCheck().is_ready())
