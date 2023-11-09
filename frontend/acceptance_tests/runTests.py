import os
from sys import platform

# Copied code from https://gitlab.com/sarthaksirotiya/cs373-idb/-/blob/main/front-end/guitests.py
# Edited code to implement the tests that we want

if __name__ == "__main__":
    # Use chromedriver based on OS
    if platform == "win32":
        PATH = "./chromedriver.exe"
    elif platform == "linux":
        PATH = "./chromedriver_linux"
    else:
        print("Unsupported OS")
        exit(-1)

    os.system("python3 ./navBarTests.py")

