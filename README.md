# blocksalat

this is a very rough sketch, trying out [blockly](https://www.npmjs.com/package/blockly) as a ui for [kabelsalat](https://kabel.salat.dev/learn/).

## examples

- [modulated saw](https://felixroos.github.io/blocksalat/#eyJibG9ja3MiOnsibGFuZ3VhZ2VWZXJzaW9uIjowLCJibG9ja3MiOlt7InR5cGUiOiJvdXQiLCJpZCI6Ik15fVBrSUA1WjhWNk5UXWt7Ui1DIiwieCI6MTIxLCJ5IjoxMDAsImlucHV0cyI6eyJpbnB1dCI6eyJibG9jayI6eyJ0eXBlIjoibHBmIiwiaWQiOiJ2SiRBNklockojXlAkMzd+YEBWWyIsImlucHV0cyI6eyJpbiI6eyJibG9jayI6eyJ0eXBlIjoic2F3IiwiaWQiOiJ9Uz0wYVtOSXp6V1JPYGNybEh1aSIsImlucHV0cyI6eyJmcmVxIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJbSUN0cW9+UFd3S2AyOF50QWhELSIsImZpZWxkcyI6eyJOVU0iOiI1NSJ9fX19fX0sImN1dG9mZiI6eyJibG9jayI6eyJ0eXBlIjoicmFuZ2UiLCJpZCI6InJvZEoxY0AjISxbeWBDbDBjLDAkIiwiaW5wdXRzIjp7ImluIjp7ImJsb2NrIjp7InR5cGUiOiJzaW5lIiwiaWQiOiJfREg7X1ZxUEhwM0NiQlk0JFFaPyIsImlucHV0cyI6eyJmcmVxIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJSaCVjJEFPQ3g3Zj1XLSVUaFZgNyIsImZpZWxkcyI6eyJOVU0iOiIuMiJ9fX19fX0sIm1pbiI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiJUl3Y3JES1ZRc1ptQitiaSkyengiLCJmaWVsZHMiOnsiTlVNIjoiLjMifX19LCJtYXgiOnsiYmxvY2siOnsidHlwZSI6Im4iLCJpZCI6IlF3cHQocjd1Sld0TFBiOzdabDhJIiwiZmllbGRzIjp7Ik5VTSI6Ii41In19fX19fSwicmVzbyI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiV21GIXY/Szs0LzNXMS9JKWBuQ08iLCJmaWVsZHMiOnsiTlVNIjoiLjIifX19fX19fX1dfX0)
- [multichannel](https://felixroos.github.io/blocksalat/#eyJibG9ja3MiOnsibGFuZ3VhZ2VWZXJzaW9uIjowLCJibG9ja3MiOlt7InR5cGUiOiJvdXQiLCJpZCI6Ijc/MCo9TURqby0uNVA5bTdFZiVzIiwieCI6MTIzLCJ5IjoxMzEsImlucHV0cyI6eyJpbnB1dCI6eyJibG9jayI6eyJ0eXBlIjoibXVsIiwiaWQiOiIxZCpGQXd3MmBKQmtMKWJrL0pKRCIsImlucHV0cyI6eyJpbjAiOnsiYmxvY2siOnsidHlwZSI6InBvbHk4IiwiaWQiOiIpRTFiYyxKZWpIMn5NYmBoIS5tYyIsImlucHV0cyI6eyIxIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJHY3skSVYqIy1nN1N4KD9tO1BVZiIsImZpZWxkcyI6eyJOVU0iOiIxIn19fSwiMiI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoidzhTSXFHbjhRSUU3KUk9NEZWWkciLCJmaWVsZHMiOnsiTlVNIjoiLjkifX19LCIzIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiI0OCg1UFckWl01RWU4OCxDREpDNiIsImZpZWxkcyI6eyJOVU0iOiIuOCJ9fX0sIjQiOnsiYmxvY2siOnsidHlwZSI6Im4iLCJpZCI6Iik/JEk9ZVk9amRiQEFAeks5QkhfIiwiZmllbGRzIjp7Ik5VTSI6Ii43In19fSwiNSI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiN0EkZVtmZTkkUFZrcHg1aTtQV3oiLCJmaWVsZHMiOnsiTlVNIjoiLjYifX19LCI2Ijp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiIpNStwRWNUUl96XSxffTEkQCR5TCIsImZpZWxkcyI6eyJOVU0iOiIuNSJ9fX0sIjciOnsiYmxvY2siOnsidHlwZSI6Im4iLCJpZCI6IjlPYF4tKmY5Q0VjJVZhPTBXMj9AIiwiZmllbGRzIjp7Ik5VTSI6Ii40In19fSwiOCI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoifj8wJU8wVU1ZVmtFRCs4TCUkMDMiLCJmaWVsZHMiOnsiTlVNIjoiLjMifX19fX19LCJpbjEiOnsiYmxvY2siOnsidHlwZSI6InNpbmUiLCJpZCI6IjpNMGk2QiFKUD1Vfjk4VSQ6eXgzIiwiaW5wdXRzIjp7ImZyZXEiOnsiYmxvY2siOnsidHlwZSI6InBvbHk4IiwiaWQiOiJdbm14SCt6RWwjSG5QLlYtZ2B6UyIsImlucHV0cyI6eyIxIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJDNTIkRylfJHBicERFQFJmOUV+biIsImZpZWxkcyI6eyJOVU0iOiIyMjAifX19LCIyIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJZdXc7Zl10SSNWOkQ1R242aThXRSIsImZpZWxkcyI6eyJOVU0iOiIzMzEifX19LCIzIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJSdmdWM0MyRT1ARTQyYn1dKCNGXiIsImZpZWxkcyI6eyJOVU0iOiI0NDIifX19LCI0Ijp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiI5WyRSWVVrTSRkLW5AaklkQF1URyIsImZpZWxkcyI6eyJOVU0iOiI1NTMifX19LCI1Ijp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJoISlNb1VSMXhdaFtsaEhhd1d1ViIsImZpZWxkcyI6eyJOVU0iOiI2NjQifX19LCI2Ijp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiIyX3A0TDZUT08tLE1+XyglSClmYCIsImZpZWxkcyI6eyJOVU0iOiI3NzUifX19LCI3Ijp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJUbElgJG9ZaX1QMXs6dXItYE57QyIsImZpZWxkcyI6eyJOVU0iOiI4ODYifX19LCI4Ijp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiI0enU5MStgWDZASXtueEhIc0FZVSIsImZpZWxkcyI6eyJOVU0iOiI5OTcifX19fX19fX19fX19fX1dfX0=)
- [feedback](https://felixroos.github.io/blocksalat/#eyJibG9ja3MiOnsibGFuZ3VhZ2VWZXJzaW9uIjowLCJibG9ja3MiOlt7InR5cGUiOiJvdXQiLCJpZCI6Ik15fVBrSUA1WjhWNk5UXWt7Ui1DIiwieCI6MTEwLCJ5Ijo5MCwiaW5wdXRzIjp7ImlucHV0Ijp7ImJsb2NrIjp7InR5cGUiOiJhZGQiLCJpZCI6IipaMjtYRVZ4TSpHQXY3VEU2QkkoIiwiaW5wdXRzIjp7ImluMCI6eyJibG9jayI6eyJ0eXBlIjoibXVsIiwiaWQiOiJXWzUrdChqfixGdWtJblRVJTNyXyIsImlucHV0cyI6eyJpbjAiOnsiYmxvY2siOnsidHlwZSI6ImRlbGF5IiwiaWQiOiIkXnJ6SChSKk4vK0Q0fEAhYjB7XiIsImlucHV0cyI6eyJpbiI6eyJibG9jayI6eyJ0eXBlIjoic3JjIiwiaWQiOiI7aUBzcDh4Wl9rI0ldazFbVTM5LyJ9fSwidGltZSI6eyJibG9jayI6eyJ0eXBlIjoicmFuZ2UiLCJpZCI6InA4WTozL0w7N3kxOkZjfipPWV0lIiwiaW5wdXRzIjp7ImluIjp7ImJsb2NrIjp7InR5cGUiOiJzaW5lIiwiaWQiOiJwM2ArMikoO117YVcvRnBkRzlfMiIsImlucHV0cyI6eyJmcmVxIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJbbmBwS0FRa3ZIdDU9aC4lZTZRfiIsImZpZWxkcyI6eyJOVU0iOiIuMSJ9fX19fX0sIm1pbiI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiSVQodDJuVmxLJVF6RSl8Km14b1UiLCJmaWVsZHMiOnsiTlVNIjoiLjAxIn19fSwibWF4Ijp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJ4ZU5ga09mLiV4ZVNqL2RgLU0rTCIsImZpZWxkcyI6eyJOVU0iOiIuNCJ9fX19fX19fX0sImluMSI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoifUZfQW5qNGQ4TXpZOyRdRGE7UnUiLCJmaWVsZHMiOnsiTlVNIjoiLjcifX19fX19LCJpbjEiOnsiYmxvY2siOnsidHlwZSI6Im11bCIsImlkIjoiMm8xQXloU0VlSj8zSE0wZnBLV1AiLCJpbnB1dHMiOnsiaW4wIjp7ImJsb2NrIjp7InR5cGUiOiJhZCIsImlkIjoieikoUnM2TyNJeiprMF9mVSxedSQiLCJpbnB1dHMiOnsidHJpZyI6eyJibG9jayI6eyJ0eXBlIjoiaW1wdWxzZSIsImlkIjoiUFtERDhjZVZSYX5IQ2ZERExsRGQiLCJpbnB1dHMiOnsiZnJlcSI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiWUlgUGp+XlZ4RStld0VjTmF2M20iLCJmaWVsZHMiOnsiTlVNIjoiMSJ9fX19fX0sImF0dCI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiKzQ9YzkrYlhIfFlvQVdbNVJAOT0iLCJmaWVsZHMiOnsiTlVNIjoiLjAxIn19fSwiZGVjIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJQUTZ6XzpxUyNTYl43UVpCODMyLSIsImZpZWxkcyI6eyJOVU0iOiIuMyJ9fX19fX0sImluMSI6eyJibG9jayI6eyJ0eXBlIjoic2luZSIsImlkIjoiNlh6LHdOV1N2fk81SHVjXkhqfSUiLCJpbnB1dHMiOnsiZnJlcSI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiWEcvQDAkPU8rbCR0ZHM0X0lRY3IiLCJmaWVsZHMiOnsiTlVNIjoiMjIwIn19fX19fX19fX19fX19XX19)
- [am](https://felixroos.github.io/blocksalat/#eyJibG9ja3MiOnsibGFuZ3VhZ2VWZXJzaW9uIjowLCJibG9ja3MiOlt7InR5cGUiOiJvdXQiLCJpZCI6Ik15fVBrSUA1WjhWNk5UXWt7Ui1DIiwieCI6MTYyLCJ5Ijo4OCwiaW5wdXRzIjp7ImlucHV0Ijp7ImJsb2NrIjp7InR5cGUiOiJtdWwiLCJpZCI6IkNBazYoZD92Ynk2aHlgXlkkKGszIiwiaW5wdXRzIjp7ImluMCI6eyJibG9jayI6eyJ0eXBlIjoidW5pcG9sYXIiLCJpZCI6InF7ZHs3dk1jRk11WWFvbj1iU0tjIiwiaW5wdXRzIjp7ImluIjp7ImJsb2NrIjp7InR5cGUiOiJ6YXciLCJpZCI6InQvTV81TE5ZK2xfTzBwS2tYXlgrIiwiaW5wdXRzIjp7ImZyZXEiOnsiYmxvY2siOnsidHlwZSI6Im4iLCJpZCI6IixRYyVFVzlXOVEhdng1QVtdO2dmIiwiZmllbGRzIjp7Ik5VTSI6IjQifX19fX19fX19LCJpbjEiOnsiYmxvY2siOnsidHlwZSI6Im5vaXNlIiwiaWQiOiIzNDBTc0YtZVtGUFhFcFhrd11QayJ9fX19fX19XX19)
- feel free add your own by sending a PR :) i'll accept anything
