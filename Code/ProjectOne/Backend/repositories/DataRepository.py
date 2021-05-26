from .Database import Database


class DataRepository:
    @staticmethod
    def json_or_formdata(request):
        if request.content_type == 'application/json':
            gegevens = request.get_json()
        else:
            gegevens = request.form.to_dict()
        return

    @staticmethod
    def toevoegen_historiek(DeviceID, Waarde, Status, Datum):
        sql = "INSERT INTO historiek ( DeviceID, Waarde, Status, Datum) VALUES (%s, %s, %s, %s)"
        params = [DeviceID, Waarde, Status, Datum]
        return Database.execute_sql(sql, params)
