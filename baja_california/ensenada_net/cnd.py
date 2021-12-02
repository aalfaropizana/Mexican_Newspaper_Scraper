import json
import csv


with open('preArticles2.txt', encoding='utf8') as f:
    lines = f.readlines()

titulo=""
fecha=""
list_fechas_count=[]
palabras_busqueda=["delito","delincuencia","narco","chapo","asesinato","crimen"]
for line in lines:
    if "title" in json.loads(line):
        titulo=json.loads(line)["title"]
        fecha=(json.loads(line)["date"].replace(",","").strip()
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
        fecha_bien=fecha[0:2]+fecha[2:5]+fecha[5:]
        if len(fecha_bien)>10:
            fecha_bien =fecha_bien[1:] 
        if any(palabra in titulo for palabra in palabras_busqueda ):
            list_fechas_count.append((fecha_bien,1))

totals = {}
for key, value in list_fechas_count:
    totals[key] = totals.get(key, 0) + value


#print(totals)
print(len(totals)) 

a_file = open(r"d:\\Usuarios\\Aealfarop\\Documents\\estadistica_periodicos\\lider.csv", "w")

writer = csv.writer(a_file)
for key, value in totals.items():
    writer.writerow([key, value])

a_file.close()