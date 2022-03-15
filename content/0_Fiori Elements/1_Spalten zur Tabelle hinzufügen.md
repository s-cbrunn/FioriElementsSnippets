# Zielbild
### Spalten zur Tabelle hinzufügen 

![alt text](/img/addColumn2Table.jpg "Zielbild: Spalten zur Tabelle hinzufügen")

---

Die Consumption-View **ZC_FE_ADD_COLUMN** wird mit einer Metadata-Extension erweitert. Grundsätzlich könnten alle UI-Annotations auch in der Consumption-View gesetzt werden. Der Übersichtlichkeit wegen werden aber alle UI-Annotationen in der Metadata-Extension gesetzt.

Mit der Annotation **@Metadata.allowExtension: true** wird die Consumption View mit einer Metadata-Extension erweitert.
![alt text](/img/addColumn2TableConsumptionView.jpg "Consumption-View ZC_FE_ADD_COLUMN ")



Die folgende Abbildung zeigt die Metadata-Extension und die Felder, welche im Frontend direkt angezeigt werden sollen. Durch die Annotation **@UI.lineItem** werden die Felder bzw. Spalten beim öffnen der Fiori-Elements App direkt sichtbar - "Standardsicht". Mit dem Zusatz **position: 10** kann die Reihenfolge der Spalten festgelegt werden. 

![alt text](/img/addColumn2TableMetaDataExtension.jpg "Metadata-Extension der Consumption-View ZC_FE_ADD_COLUMN")

Es müssen nicht alle Felder mit der UI.lineItem Annotation versehen werden. Felder, welche keine UI Annotation besitzen, sind im Spaltenvorrat der App verfügbar.


![alt text](/img/addColumn2TableMoreFields.jpg "Weitere Felder bzw. Spalten")


