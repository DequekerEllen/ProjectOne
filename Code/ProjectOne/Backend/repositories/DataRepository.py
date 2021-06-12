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
    def read_status_luik(DeviceID):
        sql = "SELECT ActieID FROM historiek WHERE DeviceID = %s ORDER BY Datum DESC LIMIT 1"
        params = [DeviceID]
        return Database.get_one_row(sql, params)

    @staticmethod
    def read_katten():
        sql = "SELECT KatID, Naam, Status from kat"
        return Database.get_rows(sql)

    @staticmethod
    def read_katid_by_rfid(rfid):
        sql = "SELECT KatID FROM kat WHERE RfidNummer = %s"
        params = [rfid]
        return Database.get_one_row(sql, params)

    @staticmethod
    def read_gepaseerd(katid):
        sql = "SELECT Gepaseerd FROM kat WHERE KatID = %s"
        params = [katid]
        return Database.get_one_row(sql, params)

    @staticmethod
    def toevoegen_historiek(DeviceID, ActieID, Waarde, Datum):
        sql = "INSERT INTO historiek (DeviceID, ActieID, Waarde, Datum) VALUES (%s, %s, %s, %s)"
        params = [DeviceID, ActieID, Waarde, Datum]
        return Database.execute_sql(sql, params)

    @staticmethod
    def toevoegen_kat(Naam, RfidNummer, Status):
        sql = "INSERT INTO kat (Naam, RfidNummer, Status) VALUES (%s, %s, %s)"
        params = [Naam, RfidNummer, Status]
        return Database.execute_sql(sql, params)

    @staticmethod
    def verwijder_kat(id):
        sql = "DELETE from kat WHERE KatID = %s"
        params = [id]
        return Database.execute_sql(sql, params)

    @staticmethod
    def update_status_kat(id, status, gepaseerd):
        sql = "UPDATE kat SET status = %s, Gepaseerd = %s WHERE KatID = %s"
        params = [status, gepaseerd, id]
        return Database.execute_sql(sql, params)
