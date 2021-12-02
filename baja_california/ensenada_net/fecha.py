import json

fechas_bien=[]
sub_bien=[]
#DD/MM/YYYY
with open('preArticles2.txt', encoding='utf8') as f:
    lines = f.readlines()
bad_fecha=""
for line in lines:
    bad_fecha="0"+json.loads(line)["date"]
    fechas_bien.append(bad_fecha.replace(" de "," ").strip()
    .replace("enero","01")
    .replace("febrero","02")
    .replace("marzo","03")
    .replace("abril","04")
    .replace("mayo","05")
    .replace("junio","06")
    .replace("julio","07")
    .replace("agosto","08")
    .replace("septiembre","09")
    .replace("octubre","10")
    .replace("noviembre","11")
    .replace("diciembre","12").replace(" ","/"))
    #print(bad_fecha)
    
for fecha in fechas_bien:
    sub =fecha[0:2]+fecha[2:5]+fecha[5:]
    if len(sub)>10:
        sub =sub[1:] 
    print(sub)