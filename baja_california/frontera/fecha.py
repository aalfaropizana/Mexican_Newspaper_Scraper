import json

fechas_bien=[]
sub_bien=[]
#DD/MM/YYYY
with open('preArticles2.txt', encoding='utf8') as f:
    lines = f.readlines()
bad_fecha=""
for line in lines:
    bad_fecha=json.loads(line)["date"]
    print(bad_fecha[:9])