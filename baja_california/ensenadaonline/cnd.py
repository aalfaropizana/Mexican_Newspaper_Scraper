#Dic 19, 2020
#Ago 22, 2020
import json

fechas_bien=[]
sub_bien=[]
#DD/MM/YYYY
with open('preArticles2.txt', encoding='utf8') as f:
    lines = f.readlines()
bad_fecha=""
titulo=""
list_fechas_count=[]
palabras_busqueda=["delito","delitos","delincuencia","narco","chapo","asesinato","crimen"]
for line in lines:
    if "preview" in json.loads(line):
        titulo=json.loads(line)["preview"]
        bad_fecha=(json.loads(line)["date"].replace(",","").replace(" ","").strip())
        sub=bad_fecha[0:3]+"/0"+bad_fecha[3:5]+"/"+bad_fecha[5:]
        if len(sub)>11:
            sub =bad_fecha[3:5]+"/"+bad_fecha[0:3]+"/"+bad_fecha[5:]
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
        #print(sub)
        if any(palabra in titulo for palabra in palabras_busqueda ):
            list_fechas_count.append((sub,1))
   
# for sub in sub_bien:
#     print(sub)
totals = {}
for key, value in list_fechas_count:
    totals[key] = totals.get(key, 0) + value


print(len(totals))