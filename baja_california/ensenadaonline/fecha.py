#Dic 19, 2020
#Ago 22, 2020
import json

fechas_bien=[]
sub_bien=[]
#DD/MM/YYYY
with open('preArticles2.txt', encoding='utf8') as f:
    lines = f.readlines()
bad_fecha=""
for line in lines:
    bad_fecha=json.loads(line)["date"]
    fechas_bien.append(bad_fecha.replace(",","").replace(" ","").strip())
    #print(bad_fecha)
for fecha in fechas_bien:
    sub=fecha[0:3]+"/0"+fecha[3:5]+"/"+fecha[5:]
    if len(sub)>11:
        sub =fecha[3:5]+"/"+fecha[0:3]+"/"+fecha[5:]
        sub_bien.append(sub.replace("Ene","01")
        .replace("Feb","02")
        .replace("Mar","03")
        .replace("Abr","04")
        .replace("May","05")
        .replace("Jun","06")
        .replace("Jul","07")
        .replace("Ago","08")
        .replace("Sep","09")
        .replace("Oct","10")
        .replace("Nov","11")
        .replace("Dic","12"))
   
for sub in sub_bien:
    print(sub)
        