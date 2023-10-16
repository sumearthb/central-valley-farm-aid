import unittest
import app

class Tests(unittest.TestCase):
    
    def setUp(self):
        app.app.config["TESTING"] = True
        self.client = app.app.test_client()

    def test_search_all(self):
        pass

    def test_get_location(self):
        pass

    def test_get_all_locations(self):
        with self.client:
            response = self.client.get("/api/getAllLocations")
            self.assertEqual(response.status_code, 200)
            data = response.json["data"]
            # TODO ~ change assert value to actual expected instance count
            self.assertEqual(response.json["instance_count"], len(data))

    def test_get_location(self):
        pass

    def test_get_all_NPs(self):
        with self.client:
            response = self.client.get("/api/getAllLocations")
            self.assertEqual(response.status_code, 200)
            data = response.json["data"]
            # TODO ~ change assert value to actual expected instance count
            self.assertEqual(response.json["instance_count"], len(data))
    
    def test_get_location(self):
        pass
    
    def test_get_all_FMs(self):
        with self.client:
            response = self.client.get("/api/getAllLocations")
            self.assertEqual(response.status_code, 200)
            data = response.json["data"]
            # TODO ~ change assert value to actual expected instance count
            self.assertEqual(response.json["instance_count"], len(data))

if __name__ == '__main__':
    unittest.main()    