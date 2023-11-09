import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


# Copied from https://gitlab.com/sarthaksirotiya/cs373-idb/-/blob/main/front-end/flow_tests/navbarTests.py

URL = "https://www.centralvalleyfarmaid.me/"


class Test(unittest.TestCase):
    @classmethod
    def setUpClass(self) -> None:
        options = webdriver.ChromeOptions()
        options.add_experimental_option("excludeSwitches", ["enable-logging"])
        options.add_argument("--headless")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        chrome_prefs = {}
        options.experimental_options["prefs"] = chrome_prefs
        # Disable images
        chrome_prefs["profile.default_content_settings"] = {"images": 2}

        self.driver = webdriver.Chrome(
            options=options, service=Service(ChromeDriverManager().install())
        )
        self.driver.get(URL)


    @classmethod
    def tearDownClass(self):
        self.driver.close()
        self.driver.quit()

    def testBrand(self):
        try:
            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "navbar-brand"))
            )
            element = self.driver.find_element(By.CLASS_NAME, "navbar-brand")
            element.click()
        except Exception as ex:
            print("testBrand error: " + str(ex))

        element = self.driver.find_element(By.CLASS_NAME, "navbar-brand")
        element.click()

        self.assertEqual(self.driver.current_url, URL)

    def testHome(self):
        try:
            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "nav-link"))
            )
            elements = self.driver.find_elements(By.CLASS_NAME, "nav-link")
            elements[0].click()
        except Exception as ex:
            print("testHome error: " + str(ex))

        self.assertEqual(self.driver.current_url, URL)

    def testAbout(self):
        try:
            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "nav-link"))
            )
            elements = self.driver.find_elements(By.CLASS_NAME, "nav-link")
            elements[1].click()
        except Exception as ex:
            print("testAbout error: " + str(ex))

        self.assertEqual(self.driver.current_url, URL + "about")

    def testLocations(self):
        try:
            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "nav-link"))
            )
            elements = self.driver.find_elements(By.CLASS_NAME, "nav-link")
            elements[2].click()
        except Exception as ex:
            print("testLocations error: " + str(ex))

        self.assertEqual(self.driver.current_url, URL + "locations")

    def testNonProfits(self):
        try:
            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "nav-link"))
            )
            elements = self.driver.find_elements(By.CLASS_NAME, "nav-link")
            elements[3].click()
        except Exception as ex:
            print("testNonProfits error: " + str(ex))

        self.assertEqual(self.driver.current_url, URL + "nonprofits")

    def testFarmersMarkets(self):
        try:
            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "nav-link"))
            )
            elements = self.driver.find_elements(By.CLASS_NAME, "nav-link")
            elements[4].click()
        except Exception as ex:
            print("testFarmersMarkets error: " + str(ex))

        self.assertEqual(self.driver.current_url, URL + "farmersmarkets")

if __name__ == "__main__":
    unittest.main()
