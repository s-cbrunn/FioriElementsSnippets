# Read me First

## Vorwort
Alle Fiori Elements Beispiele, welche hier aufgeführt sind, stehen auf Github als Demo-Projekt zur Verfügung. Damit die Beispiele auf den jeweiligen SAP Systemen erfolgreich installiert werden können, müssen dazu einige Dinge beachtet werden:
</br>


1. Das [Github Repository](https://www.google.com) kann über abapGit installiert werden. Wie abapGit installiert und das Repository in das SAP System importiert wird, kann [hier](https://docs.abapgit.org/guide-install.html) nachgelesen werden 


2. Grundätzlich werden alle Beispiele mit dem SFLIGHT-Datenmodell realisiert. Sollten die Tabellen auf dem SAP System keine Daten beinhalten, dann ist es mit dem Report **SAPBC_DATA_GENERATOR** möglich Demodaten zu erzeugen

3. Die Beispiele werden alle auf einem SAP Netweaver >= 7.52 realisiert. D.h. es kann keine Garantie auf die Abwärtskompatibilität der Beispiele gegeben werden.

4. Des Weiteren wird eine gewisse Erfahrung mit CDS-Views, OData-Services, BOPF und Annotations vorausgesetzt. Es handelt sich hier um keine Einführung in die Fiori Elements Entwicklung. Es sollen hier nur die Möglichkeiten von Fiori Elements aufgezeigt werden.

5. Die Veröffentlichung der OData-Service werden immer über "Reference Data Source" ausgeführt. D.h. jede Consumption-View (CDS) wird im OData exponiert.

## Installation der Beispiele

toDo