
### Verzeichnis
<br>

#### [Nicht namensgleiche Felder mit CORRESPONDING mappen](#correspondingkomponente)


***
<br>


#### **MAPPING: nicht namensgleiche Felder mappen** <a name="correspondingkomponente"></a>
Sind die Felder von zwei internen Tabellen nicht zu 100% identisch, dann muss nicht jedes Feld einzeln gemappt werden. Mit den Komponentenoperator **CORRESPONDING** und den Zusatz **MAPPING** können die Daten mit einen Statement kopiert werden. In dem Zusatz MAPPING werden nur die unterschiedlichen Felder manuell gemappt. Der Rest wird von CORRESPONDING übernommen

( >= Netweaver 7.40, SP05)

``` 
lt_tab2 = CORRESPONDING #( lt_tab1 MAPPING field = col2 ).
```
<https://github.com/s-cbrunn/ABAPCodeSnippets.git> <br>(Report: ZDEMO_CORRESPONDING_MAPPING)