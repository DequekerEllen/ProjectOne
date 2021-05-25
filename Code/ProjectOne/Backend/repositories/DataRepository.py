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
    def read_devices():
        sql = "SELECT * from Device"
        return Database.get_rows(sql)
