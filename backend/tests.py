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
            response = self.client.get("/api/GetAllLocations")
            self.assertEqual(response.status_code, 200)
            data = response.json["data"]
            self.assertIsNotNone(data)
            # TODO ~ change assert value to actual expected instance count
            self.assertEqual(response.json["instance_count"], len(data))

    def test_get_location_by_id(self):
        response = self.app.get("/api/GetLocation/x")
        self.assertEqual(response.status_code, 200)
        data = response.json
        self.assertIsNotNone(data)
        self.assertEqual(data["id"], "x")

    def test_get_NP(self):
        pass   

    def test_get_all_NPs(self):
        with self.client:
            response = self.client.get("/api/GetAllNonprofit")
            self.assertEqual(response.status_code, 200)
            data = response.json["data"]
            self.assertIsNotNone(data)
            # TODO ~ change assert value to actual expected instance count
            self.assertEqual(response.json["instance_count"], len(data))
    
    def test_get_NP_by_id(self):
        response = self.app.get("/api/GetNonProfit/x")
        self.assertEqual(response.status_code, 200)
        data = response.json
        self.assertIsNotNone(data)
        self.assertEqual(data["id"], "x")
        
    def test_get_FM(self):
        pass
    
    def test_get_all_FMs(self):
        with self.client:
            response = self.client.get("/api/GetAllMarkets")
            self.assertEqual(response.status_code, 200)
            data = response.json["data"]
            self.assertIsNotNone(data)
            # TODO ~ change assert value to actual expected instance count
            self.assertEqual(response.json["instance_count"], len(data))

    def test_get_FM_by_id(self):
        response = self.app.get("/api/GetMarket/x")
        self.assertEqual(response.status_code, 200)
        data = response.json
        self.assertIsNotNone(data)
        self.assertEqual(data["id"], "x")


if __name__ == '__main__':
    unittest.main()    