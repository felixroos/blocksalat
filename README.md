# blocksalat

a modular synth out of blocks.

this is an experiment to use [blockly](https://www.npmjs.com/package/blockly) as a ui for [kabelsalat](https://kabel.salat.dev/learn/).

live at [block.salat.dev](https://block.salat.dev/)

## examples

- [feedback](https://block.salat.dev/#eyJibG9ja3MiOnsibGFuZ3VhZ2VWZXJzaW9uIjowLCJibG9ja3MiOlt7InR5cGUiOiJvdXQiLCJpZCI6Ik15fVBrSUA1WjhWNk5UXWt7Ui1DIiwieCI6MTEwLCJ5Ijo5MCwiaW5wdXRzIjp7ImlucHV0Ijp7ImJsb2NrIjp7InR5cGUiOiJhZGQiLCJpZCI6IipaMjtYRVZ4TSpHQXY3VEU2QkkoIiwiaW5wdXRzIjp7ImluMCI6eyJibG9jayI6eyJ0eXBlIjoibXVsIiwiaWQiOiJXWzUrdChqfixGdWtJblRVJTNyXyIsImlucHV0cyI6eyJpbjAiOnsiYmxvY2siOnsidHlwZSI6ImRlbGF5IiwiaWQiOiIkXnJ6SChSKk4vK0Q0fEAhYjB7XiIsImlucHV0cyI6eyJpbiI6eyJibG9jayI6eyJ0eXBlIjoic3JjIiwiaWQiOiI7aUBzcDh4Wl9rI0ldazFbVTM5LyJ9fSwidGltZSI6eyJibG9jayI6eyJ0eXBlIjoicmFuZ2UiLCJpZCI6InA4WTozL0w7N3kxOkZjfipPWV0lIiwiaW5wdXRzIjp7ImluIjp7ImJsb2NrIjp7InR5cGUiOiJzaW5lIiwiaWQiOiJwM2ArMikoO117YVcvRnBkRzlfMiIsImlucHV0cyI6eyJmcmVxIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJbbmBwS0FRa3ZIdDU9aC4lZTZRfiIsImZpZWxkcyI6eyJOVU0iOiIuMSJ9fX19fX0sIm1pbiI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiSVQodDJuVmxLJVF6RSl8Km14b1UiLCJmaWVsZHMiOnsiTlVNIjoiLjAxIn19fSwibWF4Ijp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJ4ZU5ga09mLiV4ZVNqL2RgLU0rTCIsImZpZWxkcyI6eyJOVU0iOiIuNCJ9fX19fX19fX0sImluMSI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoifUZfQW5qNGQ4TXpZOyRdRGE7UnUiLCJmaWVsZHMiOnsiTlVNIjoiLjcifX19fX19LCJpbjEiOnsiYmxvY2siOnsidHlwZSI6Im11bCIsImlkIjoiMm8xQXloU0VlSj8zSE0wZnBLV1AiLCJpbnB1dHMiOnsiaW4wIjp7ImJsb2NrIjp7InR5cGUiOiJhZCIsImlkIjoieikoUnM2TyNJeiprMF9mVSxedSQiLCJpbnB1dHMiOnsidHJpZyI6eyJibG9jayI6eyJ0eXBlIjoiaW1wdWxzZSIsImlkIjoiUFtERDhjZVZSYX5IQ2ZERExsRGQiLCJpbnB1dHMiOnsiZnJlcSI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiWUlgUGp+XlZ4RStld0VjTmF2M20iLCJmaWVsZHMiOnsiTlVNIjoiMSJ9fX19fX0sImF0dCI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiKzQ9YzkrYlhIfFlvQVdbNVJAOT0iLCJmaWVsZHMiOnsiTlVNIjoiLjAxIn19fSwiZGVjIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJQUTZ6XzpxUyNTYl43UVpCODMyLSIsImZpZWxkcyI6eyJOVU0iOiIuMyJ9fX19fX0sImluMSI6eyJibG9jayI6eyJ0eXBlIjoic2luZSIsImlkIjoiNlh6LHdOV1N2fk81SHVjXkhqfSUiLCJpbnB1dHMiOnsiZnJlcSI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiWEcvQDAkPU8rbCR0ZHM0X0lRY3IiLCJmaWVsZHMiOnsiTlVNIjoiMjIwIn19fX19fX19fX19fX19XX19)
- [am](https://block.salat.dev/#eyJibG9ja3MiOnsibGFuZ3VhZ2VWZXJzaW9uIjowLCJibG9ja3MiOlt7InR5cGUiOiJvdXQiLCJpZCI6Ill1X0VgZSRleTIydFIsKTtEOkEwIiwieCI6MTQ2LCJ5IjoxMTMsImlucHV0cyI6eyJpbnB1dCI6eyJzaGFkb3ciOnsidHlwZSI6Im4iLCJpZCI6IiQ1eD1BNSs/R1ouNnRqLS40b1F7IiwiZmllbGRzIjp7Ik5VTSI6IjAifX0sImJsb2NrIjp7InR5cGUiOiJtdWwiLCJpZCI6Ilp8T252OTFgTjU0LypAV0Utd0goIiwiaW5wdXRzIjp7ImluMCI6eyJzaGFkb3ciOnsidHlwZSI6Im4iLCJpZCI6IlpjbCRiKltxWD8vYlRdMFIuXUE3IiwiZmllbGRzIjp7Ik5VTSI6IjEifX0sImJsb2NrIjp7InR5cGUiOiJ1bmlwb2xhciIsImlkIjoicH5YQz02fHtBSjRhKG0obChLNjEiLCJpbnB1dHMiOnsiaW4iOnsic2hhZG93Ijp7InR5cGUiOiJuIiwiaWQiOiJMe0AjbighQn0ueUh0dTcvdnR2ayIsImZpZWxkcyI6eyJOVU0iOiIwIn19LCJibG9jayI6eyJ0eXBlIjoiemF3IiwiaWQiOiJyL0YsNyFLISlWNnhyJUxxKyx1NSIsImlucHV0cyI6eyJmcmVxIjp7InNoYWRvdyI6eyJ0eXBlIjoibiIsImlkIjoiRTdieHpFfFR4RDt5XlFCQkw6Wn4iLCJmaWVsZHMiOnsiTlVNIjoiNCJ9fX19fX19fX0sImluMSI6eyJzaGFkb3ciOnsidHlwZSI6Im4iLCJpZCI6ImRtKE5pYzMrL1dRO2ljTlo1TyQ5IiwiZmllbGRzIjp7Ik5VTSI6IjEifX0sImJsb2NrIjp7InR5cGUiOiJub2lzZSIsImlkIjoiMzQwU3NGLWVbRlBYRXBYa3ddUGsifX19fX0sImNoYW5uZWwiOnsic2hhZG93Ijp7InR5cGUiOiJzdGVyZW8iLCJpZCI6ImRBLD1oREtaTkNvb0VPZEg1YXJ9In19fX1dfX0=)
- [kick + snare](https://block.salat.dev/#eyJ3b3Jrc3BhY2VDb21tZW50cyI6W3siaGVpZ2h0IjoxMDAsIndpZHRoIjoxMjAsImlkIjoidDFmP19UVXM9dlc6bDRXfjtpXTAiLCJ4Ijo0NDAuMzM1OTM3NSwieSI6NDY0LjUxNTYyNTAwMDAwMDM0LCJ0ZXh0Ijoia2ljayIsImNvbGxhcHNlZCI6dHJ1ZX0seyJoZWlnaHQiOjEwMCwid2lkdGgiOjEyMCwiaWQiOiJ9bTV5Z09la1R0T0ppTWV0IVp7YSIsIngiOjQ1MS4zMjgxMjUsInkiOjExOC4xODc1MDAwMDAwMDAzNCwidGV4dCI6InNuYXJlIiwiY29sbGFwc2VkIjp0cnVlfV0sImJsb2NrcyI6eyJsYW5ndWFnZVZlcnNpb24iOjAsImJsb2NrcyI6W3sidHlwZSI6Im91dCIsImlkIjoiTXl9UGtJQDVaOFY2TlRda3tSLUMiLCJ4Ijo1NSwieSI6NjIsImlucHV0cyI6eyJpbnB1dCI6eyJibG9jayI6eyJ0eXBlIjoiYWRkIiwiaWQiOiJ3SnNsXSglSyl5cy5YMEJtdC1JYiIsImlucHV0cyI6eyJpbjAiOnsiYmxvY2siOnsidHlwZSI6ImxwZiIsImlkIjoicTlNMzUlcyNGdlVvJS5fRTA/SzEiLCJpbnB1dHMiOnsiaW4iOnsiYmxvY2siOnsidHlwZSI6Im11bCIsImlkIjoiZWhpK3VCKCR1THo3fWdjX3ZGZTEiLCJpbnB1dHMiOnsiaW4wIjp7ImJsb2NrIjp7InR5cGUiOiJub2lzZSIsImlkIjoiLHR0W2F0ajpYelZXWTRaPSlBUX4ifX0sImluMSI6eyJibG9jayI6eyJ0eXBlIjoiYWQiLCJpZCI6IihfOG5JRX0peXVMOnB5QnFlTzs4IiwiaW5wdXRzIjp7InRyaWciOnsiYmxvY2siOnsidHlwZSI6ImltcHVsc2UiLCJpZCI6InxbVVhod118K19SVy1qUChEVSVfIiwiaW5wdXRzIjp7ImZyZXEiOnsiYmxvY2siOnsidHlwZSI6Im4iLCJpZCI6IkFaPSlSVjhwMWgpNCVFK0kjdCRtIiwiZmllbGRzIjp7Ik5VTSI6IjEifX19LCJwaGFzZSI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoic2Z9YEFjciksUm5eVUU4ej86fisiLCJmaWVsZHMiOnsiTlVNIjoiLjUifX19fX19LCJhdHQiOnsiYmxvY2siOnsidHlwZSI6Im4iLCJpZCI6Ii5edlYvMzYlMCR4RlZRVys9JGhLIiwiZmllbGRzIjp7Ik5VTSI6IjAifX19LCJkZWMiOnsiYmxvY2siOnsidHlwZSI6Im4iLCJpZCI6IjojMkhicGlJT2s2dEdRZmFVYUp3IiwiZmllbGRzIjp7Ik5VTSI6Ii4xMSJ9fX19fX19fX0sImN1dG9mZiI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiKGpPLXVPQWouW2F3WG5FfE5uTi4iLCJmaWVsZHMiOnsiTlVNIjoiLjc4In19fSwicmVzbyI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoibmhreEctMmYpIVs5YlpfJF98MzciLCJmaWVsZHMiOnsiTlVNIjoiLjI5In19fX19fSwiaW4xIjp7ImJsb2NrIjp7InR5cGUiOiJkaXN0b3J0IiwiaWQiOiJFOmhFTW4hNSRDaXpee2sjK35BUyIsImlucHV0cyI6eyJpbiI6eyJibG9jayI6eyJ0eXBlIjoic2luZSIsImlkIjoiZTthN3p2KTZ8IW4pdnh3LEEsNCsiLCJpbnB1dHMiOnsiZnJlcSI6eyJibG9jayI6eyJ0eXBlIjoibXVsIiwiaWQiOiJ3eU0yKD8yNWRsel1TbCV8a3gyWSIsImlucHV0cyI6eyJpbjAiOnsiYmxvY2siOnsidHlwZSI6InBvdyIsImlkIjoiT0B8Py1yKSlZaVl4MmsvfGV2THIiLCJpbnB1dHMiOnsiaW4iOnsiYmxvY2siOnsidHlwZSI6InNyYyIsImlkIjoiflIpcyQ0Z2BqTUdXeGJuVyxAMXUiLCJpbnB1dHMiOnsiY2hhbm5lbCI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiSjpyd2QoQCpMNFVoLmxpMio/OlAiLCJmaWVsZHMiOnsiTlVNIjoiMiJ9fX19fX0sInBvd2VyIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJFS0Nre2E4ciR4P2xLM1pNIypSLiIsImZpZWxkcyI6eyJOVU0iOiIyIn19fX19fSwiaW4xIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJsZHdfI1trTDdTOVNQWT1Ie1MxXyIsImZpZWxkcyI6eyJOVU0iOiIxNTgifX19fX19LCJzeW5jIjp7ImJsb2NrIjp7InR5cGUiOiJzcmMiLCJpZCI6ImAvM3tbQEFtITF2fX4vMGVtOHlXIiwiaW5wdXRzIjp7ImNoYW5uZWwiOnsiYmxvY2siOnsidHlwZSI6Im4iLCJpZCI6IjsoO2ZjW2heSkZtfWt5fU8sWkBdIiwiZmllbGRzIjp7Ik5VTSI6IjIifX19fX19fX19LCJhbXQiOnsiYmxvY2siOnsidHlwZSI6Im4iLCJpZCI6Il4oZkx9al1edExoW2ZsXk4kRk9NIiwiZmllbGRzIjp7Ik5VTSI6Ii45In19fX19fX19fX19LHsidHlwZSI6Im91dCIsImlkIjoiMzpPOS89XXA7O0NWSDM2Y0FIRnciLCJ4IjozNTcsInkiOjczMywiaW5wdXRzIjp7ImlucHV0Ijp7ImJsb2NrIjp7InR5cGUiOiJhZCIsImlkIjoiXTdKOjB8QC8pTVEuTl8pSXJDJUsiLCJpbnB1dHMiOnsidHJpZyI6eyJibG9jayI6eyJ0eXBlIjoiaW1wdWxzZSIsImlkIjoibCFNZ18/V3BsfSNRYXJkQ1VBdEUiLCJpbnB1dHMiOnsiZnJlcSI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiQUFPfHRfJElYaVckQHpdYFl3MVsiLCJmaWVsZHMiOnsiTlVNIjoiMiJ9fX19fX0sImF0dCI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoidDdIX1BZQDNmb05bUVktTEB1dmsiLCJmaWVsZHMiOnsiTlVNIjoiMCJ9fX0sImRlYyI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiUyFiKk85RTYlblteMzNNUEJxZlsiLCJmaWVsZHMiOnsiTlVNIjoiLjExIn19fX19fSwiY2hhbm5lbCI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiez9kaGRGLTB2PTtSQ1UpTjc0MToiLCJmaWVsZHMiOnsiTlVNIjoiMiJ9fX19fV19fQ==)
- [monoponic midi example](https://block.salat.dev/#eyJibG9ja3MiOnsibGFuZ3VhZ2VWZXJzaW9uIjowLCJibG9ja3MiOlt7InR5cGUiOiJvdXQiLCJpZCI6Ik15fVBrSUA1WjhWNk5UXWt7Ui1DIiwieCI6ODQsInkiOjUwLCJpbnB1dHMiOnsiaW5wdXQiOnsiYmxvY2siOnsidHlwZSI6Im11bCIsImlkIjoiRD1uN2t1VSFlKl9YS1ZQYF4pRV4iLCJpbnB1dHMiOnsiaW4wIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJoeEJ9bTtuITtMZU5vc0lLQTl2WCIsImZpZWxkcyI6eyJOVU0iOiIuNSJ9fX0sImluMSI6eyJibG9jayI6eyJ0eXBlIjoiYWRkIiwiaWQiOiIuO28hdXUlXi18aUJ0T0lWKEMxTCIsImlucHV0cyI6eyJpbjAiOnsiYmxvY2siOnsidHlwZSI6Im11bCIsImlkIjoiaW53UHYvfSt4bXtJeDZiWVp0O0YiLCJpbnB1dHMiOnsiaW4wIjp7ImJsb2NrIjp7InR5cGUiOiJkZWxheSIsImlkIjoiLnVNbTR6QT9bc058M1A2TVJ+N1siLCJpbnB1dHMiOnsiaW4iOnsiYmxvY2siOnsidHlwZSI6InNyYyIsImlkIjoiZGY/SCg1ZilrP3Z0NHgjQH1ZW28ifX0sInRpbWUiOnsiYmxvY2siOnsidHlwZSI6Im4iLCJpZCI6Im1qZDJbLSghSTF3NHVsWnpwKGV+IiwiZmllbGRzIjp7Ik5VTSI6Ii4zNCJ9fX19fX0sImluMSI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiLTR6TSNjeFR4XSNtIzBJe1h+fFMiLCJmaWVsZHMiOnsiTlVNIjoiLjkifX19fX19LCJpbjEiOnsiYmxvY2siOnsidHlwZSI6Im11bCIsImlkIjoidHh+TTt7XmNCSDgteDB0b0NRbkoiLCJpbnB1dHMiOnsiaW4wIjp7ImJsb2NrIjp7InR5cGUiOiJzaW5lIiwiaWQiOiJPelcjeUVBKXtydiRmWjlZWkRUeSIsImlucHV0cyI6eyJmcmVxIjp7ImJsb2NrIjp7InR5cGUiOiJtaWRpZnJlcSIsImlkIjoidkJOV0gqb050QkErU1krO2pTKWQiLCJpbnB1dHMiOnsiY2hhbm5lbCI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiSWtudjprMzs4TSlRfGhKY209MSMiLCJmaWVsZHMiOnsiTlVNIjoiMSJ9fX19fX19fX0sImluMSI6eyJibG9jayI6eyJ0eXBlIjoiYWRzciIsImlkIjoiS2JQb3FmN2BYR1NlcW9POTR6b24iLCJpbnB1dHMiOnsiZ2F0ZSI6eyJibG9jayI6eyJ0eXBlIjoibWlkaWdhdGUiLCJpZCI6InUyPUlVNEZQQihDO1AuSWYqU2FCIiwiaW5wdXRzIjp7ImNoYW5uZWwiOnsiYmxvY2siOnsidHlwZSI6Im4iLCJpZCI6Inkke0d4aUUwOlhUXy96VV1KV1J6IiwiZmllbGRzIjp7Ik5VTSI6IjEifX19fX19LCJhdHQiOnsiYmxvY2siOnsidHlwZSI6Im4iLCJpZCI6InY5LVFFKT12VTE7UzpJKG9pT0gzIiwiZmllbGRzIjp7Ik5VTSI6IjAuMDIifX19LCJkZWMiOnsiYmxvY2siOnsidHlwZSI6Im4iLCJpZCI6IjldcXJgVSleSmctdm5lS3RtQlouIiwiZmllbGRzIjp7Ik5VTSI6Ii4zIn19fSwic3VzIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJ0ZjN2K11ib2ZwfV1ASVY0NXhVLCIsImZpZWxkcyI6eyJOVU0iOiIuMSJ9fX0sInJlbCI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoieWtdeHA2c0RVXnx1OFJfQ34paWoiLCJmaWVsZHMiOnsiTlVNIjoiLjIifX19fX19fX19fX19fX19fX1dfX0=) tested with [this strudel pattern](https://strudel.cc/#bigiMCAuLiA3Iikuc2NhbGUoIkM0Om1pbm9yIikuY2xpcCguNSkubWlkaSgp)
- [polyphonic midi example](https://block.salat.dev/#eyJibG9ja3MiOnsibGFuZ3VhZ2VWZXJzaW9uIjowLCJibG9ja3MiOlt7InR5cGUiOiJvdXQiLCJpZCI6Ik15fVBrSUA1WjhWNk5UXWt7Ui1DIiwieCI6ODQsInkiOjUwLCJpbnB1dHMiOnsiaW5wdXQiOnsiYmxvY2siOnsidHlwZSI6Im11bCIsImlkIjoiRD1uN2t1VSFlKl9YS1ZQYF4pRV4iLCJpbnB1dHMiOnsiaW4wIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJoeEJ9bTtuITtMZU5vc0lLQTl2WCIsImZpZWxkcyI6eyJOVU0iOiIuNSJ9fX0sImluMSI6eyJibG9jayI6eyJ0eXBlIjoiYWRkIiwiaWQiOiIuO28hdXUlXi18aUJ0T0lWKEMxTCIsImlucHV0cyI6eyJpbjAiOnsiYmxvY2siOnsidHlwZSI6Im11bCIsImlkIjoiaW53UHYvfSt4bXtJeDZiWVp0O0YiLCJpbnB1dHMiOnsiaW4wIjp7ImJsb2NrIjp7InR5cGUiOiJkZWxheSIsImlkIjoiLnVNbTR6QT9bc058M1A2TVJ+N1siLCJpbnB1dHMiOnsiaW4iOnsiYmxvY2siOnsidHlwZSI6InNyYyIsImlkIjoiZGY/SCg1ZilrP3Z0NHgjQH1ZW28iLCJpbnB1dHMiOnsiY2hhbm5lbCI6eyJibG9jayI6eyJ0eXBlIjoicG9seTIiLCJpZCI6ImsrO25tRkw3fEEqQjNkdUdUaDAqIiwiaW5wdXRzIjp7IjEiOnsiYmxvY2siOnsidHlwZSI6Im4iLCJpZCI6Ii1rd1ZacHdPL3EoLnp+SSxybUNvIiwiZmllbGRzIjp7Ik5VTSI6IjAifX19LCIyIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJrTnB4Q1FnVGluWVQoLDZjVnteYSIsImZpZWxkcyI6eyJOVU0iOiIxIn19fX19fX19fSwidGltZSI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoibWpkMlstKCFJMXc0dWxaenAoZX4iLCJmaWVsZHMiOnsiTlVNIjoiLjE0In19fX19fSwiaW4xIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiItNHpNI2N4VHhdI20jMEl7WH58UyIsImZpZWxkcyI6eyJOVU0iOiIuOCJ9fX19fX0sImluMSI6eyJibG9jayI6eyJ0eXBlIjoibXVsIiwiaWQiOiJ0eH5NO3teY0JIOC14MHRvQ1FuSiIsImlucHV0cyI6eyJpbjAiOnsiYmxvY2siOnsidHlwZSI6InNpbmUiLCJpZCI6Ik96VyN5RUEpe3J2JGZaOVlaRFR5IiwiaW5wdXRzIjp7ImZyZXEiOnsiYmxvY2siOnsidHlwZSI6ImZvcmsiLCJpZCI6ImliVCU6XyFkeCVPYClBJV5rUUtZIiwiaW5wdXRzIjp7ImluIjp7ImJsb2NrIjp7InR5cGUiOiJtaWRpZnJlcSIsImlkIjoidkJOV0gqb050QkErU1krO2pTKWQiLCJpbnB1dHMiOnsiY2hhbm5lbCI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiSWtudjprMzs4TSlRfGhKY209MSMiLCJmaWVsZHMiOnsiTlVNIjoiMSJ9fX19fX0sInRpbWVzIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJVJCE6MVgzUEBZfXtHYTAtUGxeIyIsImZpZWxkcyI6eyJOVU0iOiI0In19fX19fX19fSwiaW4xIjp7ImJsb2NrIjp7InR5cGUiOiJhZHNyIiwiaWQiOiJLYlBvcWY3YFhHU2Vxb085NHpvbiIsImlucHV0cyI6eyJnYXRlIjp7ImJsb2NrIjp7InR5cGUiOiJmb3JrIiwiaWQiOiIyRXw6RmlxS3J9cCNKRFNdeU9BZSIsImlucHV0cyI6eyJpbiI6eyJibG9jayI6eyJ0eXBlIjoibWlkaWdhdGUiLCJpZCI6InUyPUlVNEZQQihDO1AuSWYqU2FCIiwiaW5wdXRzIjp7ImNoYW5uZWwiOnsiYmxvY2siOnsidHlwZSI6Im4iLCJpZCI6Inkke0d4aUUwOlhUXy96VV1KV1J6IiwiZmllbGRzIjp7Ik5VTSI6IjEifX19fX19LCJ0aW1lcyI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiRSUobVQ3QDh1cj10bTV+JEVLYX4iLCJmaWVsZHMiOnsiTlVNIjoiNCJ9fX19fX0sImF0dCI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoidjktUUUpPXZVMTtTOkkob2lPSDMiLCJmaWVsZHMiOnsiTlVNIjoiMC4wMiJ9fX0sImRlYyI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiOV1xcmBVKV5KZy12bmVLdG1CWi4iLCJmaWVsZHMiOnsiTlVNIjoiLjMifX19LCJzdXMiOnsiYmxvY2siOnsidHlwZSI6Im4iLCJpZCI6InRmM3YrXWJvZnB9XUBJVjQ1eFUsIiwiZmllbGRzIjp7Ik5VTSI6IjAifX19LCJyZWwiOnsiYmxvY2siOnsidHlwZSI6Im4iLCJpZCI6InlrXXhwNnNEVV58dThSX0N+KWlqIiwiZmllbGRzIjp7Ik5VTSI6Ii4yIn19fX19fX19fX19fX19fX19XX19) tested with [this strudel pattern](https://strudel.cc/#bigiMCwxLDIsMyIpLmNob3JkKCI8RG03IEc3IENeNyBBN2I5PiIpLnZvaWNpbmcoKS5taWRpKCk%3D)
- [audio input + feedback](https://block.salat.dev/#eyJibG9ja3MiOnsibGFuZ3VhZ2VWZXJzaW9uIjowLCJibG9ja3MiOlt7InR5cGUiOiJvdXQiLCJpZCI6Ik15fVBrSUA1WjhWNk5UXWt7Ui1DIiwieCI6MTEwLCJ5Ijo5MCwiaW5wdXRzIjp7ImlucHV0Ijp7ImJsb2NrIjp7InR5cGUiOiJhZGQiLCJpZCI6IipaMjtYRVZ4TSpHQXY3VEU2QkkoIiwiaW5wdXRzIjp7ImluMCI6eyJibG9jayI6eyJ0eXBlIjoibXVsIiwiaWQiOiJXWzUrdChqfixGdWtJblRVJTNyXyIsImlucHV0cyI6eyJpbjAiOnsiYmxvY2siOnsidHlwZSI6ImRlbGF5IiwiaWQiOiIkXnJ6SChSKk4vK0Q0fEAhYjB7XiIsImlucHV0cyI6eyJpbiI6eyJibG9jayI6eyJ0eXBlIjoic3JjIiwiaWQiOiI7aUBzcDh4Wl9rI0ldazFbVTM5LyJ9fSwidGltZSI6eyJibG9jayI6eyJ0eXBlIjoicmFuZ2UiLCJpZCI6InA4WTozL0w7N3kxOkZjfipPWV0lIiwiaW5wdXRzIjp7ImluIjp7ImJsb2NrIjp7InR5cGUiOiJzaW5lIiwiaWQiOiJwM2ArMikoO117YVcvRnBkRzlfMiIsImlucHV0cyI6eyJmcmVxIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJbbmBwS0FRa3ZIdDU9aC4lZTZRfiIsImZpZWxkcyI6eyJOVU0iOiIuMSJ9fX19fX0sIm1pbiI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoiSVQodDJuVmxLJVF6RSl8Km14b1UiLCJmaWVsZHMiOnsiTlVNIjoiLjAxIn19fSwibWF4Ijp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJ4ZU5ga09mLiV4ZVNqL2RgLU0rTCIsImZpZWxkcyI6eyJOVU0iOiIuNCJ9fX19fX19fX0sImluMSI6eyJibG9jayI6eyJ0eXBlIjoibiIsImlkIjoifUZfQW5qNGQ4TXpZOyRdRGE7UnUiLCJmaWVsZHMiOnsiTlVNIjoiLjcifX19fX19LCJpbjEiOnsiYmxvY2siOnsidHlwZSI6ImF1ZGlvaW4iLCJpZCI6IjYzN2N2c3pJJX43UFBQUSk4MzdbIn19fX19fX1dfX0=)
- [custom blocks](https://block.salat.dev/#eyJibG9ja3MiOnsibGFuZ3VhZ2VWZXJzaW9uIjowLCJibG9ja3MiOlt7InR5cGUiOiJyZWdpc3RlciIsImlkIjoicjQpalVkOV9ERmNPNC1PZnFEfTMiLCJ4Ijo4NCwieSI6NDEsImZpZWxkcyI6eyJuYW1lIjoibGZvIn0sImlucHV0cyI6eyJpbnB1dCI6eyJibG9jayI6eyJ0eXBlIjoicmFuZ2UiLCJpZCI6ImFVM2JDLGxqXWdZTi1gOGpJWCs/IiwiaW5wdXRzIjp7ImluIjp7InNoYWRvdyI6eyJ0eXBlIjoibiIsImlkIjoifDs/RDZTeVtzWnZ4aUwzLl1ZbFsiLCJmaWVsZHMiOnsiTlVNIjoiMCJ9fSwiYmxvY2siOnsidHlwZSI6InNpbmUiLCJpZCI6Ik02LipGWV9ldjspSUZ6P3MqVHdkIiwiaW5wdXRzIjp7ImZyZXEiOnsic2hhZG93Ijp7InR5cGUiOiJuIiwiaWQiOiJtMjpsLmxQezZ5M0RfazV9SUE6aiIsImZpZWxkcyI6eyJOVU0iOiIwIn19LCJibG9jayI6eyJ0eXBlIjoiaW5wdXQiLCJpZCI6InRtZSpyTWF+KnRXX2wzJHZDei9wIiwiZmllbGRzIjp7Im5hbWUiOiJmcmVxIn19fSwic3luYyI6eyJzaGFkb3ciOnsidHlwZSI6Im4iLCJpZCI6IkdDOWZyITgxc0ZbS3Ejey8rKmJlIiwiZmllbGRzIjp7Ik5VTSI6IjAifX19LCJwaGFzZSI6eyJzaGFkb3ciOnsidHlwZSI6Im4iLCJpZCI6InBaXT1QUDVaPUdRI0hgTS02ZkZqIiwiZmllbGRzIjp7Ik5VTSI6IjAifX19fX19LCJtaW4iOnsic2hhZG93Ijp7InR5cGUiOiJuIiwiaWQiOiJbUXUjUmNaalMrO3NrLXpBJH5mTSIsImZpZWxkcyI6eyJOVU0iOiIwIn19LCJibG9jayI6eyJ0eXBlIjoiaW5wdXQiLCJpZCI6IitZSylMdlRtRXlUUFAlOWRvP1JIIiwiZmllbGRzIjp7Im5hbWUiOiJtaW4ifX19LCJtYXgiOnsic2hhZG93Ijp7InR5cGUiOiJuIiwiaWQiOiJ7b19gIXVQWkFMVmFjOUk1MSFaXyIsImZpZWxkcyI6eyJOVU0iOiIwIn19LCJibG9jayI6eyJ0eXBlIjoiaW5wdXQiLCJpZCI6IlQ3aFZRTitXKDhNJDFeNFVrUnpVIiwiZmllbGRzIjp7Im5hbWUiOiJtYXgifX19fX19fX0seyJ0eXBlIjoib3V0IiwiaWQiOiJGXj9CbnBzfUxhcDdfYDI4XiMhNCIsIngiOjgyLCJ5IjoyNzYsImlucHV0cyI6eyJpbnB1dCI6eyJzaGFkb3ciOnsidHlwZSI6Im4iLCJpZCI6Ij9bRHBiUGIsMXo/Q3o7XlMrUXFMIiwiZmllbGRzIjp7Ik5VTSI6IjAifX0sImJsb2NrIjp7InR5cGUiOiJzaW5lIiwiaWQiOiJCcUc4Q1VWXzItdUsyWTs1YDQpTCIsImlucHV0cyI6eyJmcmVxIjp7InNoYWRvdyI6eyJ0eXBlIjoibiIsImlkIjoiLUtwcCpYeFgkNS07U3F4Py5dYTEiLCJmaWVsZHMiOnsiTlVNIjoiMjAwIn19LCJibG9jayI6eyJ0eXBlIjoibGZvIiwiaWQiOiJ0bD1OKi8jaz1xdzAwfVl5dDtMOiIsImlucHV0cyI6eyJmcmVxIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiI1PT85QSE/SW8hOX4vVlMqY2VOdyIsImZpZWxkcyI6eyJOVU0iOiIxIn19fSwibWluIjp7ImJsb2NrIjp7InR5cGUiOiJuIiwiaWQiOiJHOSF0a2BKZzlgLSwkOT9kN1FUJCIsImZpZWxkcyI6eyJOVU0iOiIxMDAifX19LCJtYXgiOnsiYmxvY2siOnsidHlwZSI6Im4iLCJpZCI6Im43VjJyLHtsMyRNUUB0ZyxRX31QIiwiZmllbGRzIjp7Ik5VTSI6IjIwMCJ9fX19fX19fX19fV19fQ==)
- [lambda feedback](https://block.salat.dev/#eyJibG9ja3MiOnsibGFuZ3VhZ2VWZXJzaW9uIjowLCJibG9ja3MiOlt7InR5cGUiOiJvdXQiLCJpZCI6Ik15fVBrSUA1WjhWNk5UXWt7Ui1DIiwieCI6OTAsInkiOjEwMCwiaW5wdXRzIjp7ImlucHV0Ijp7ImJsb2NrIjp7InR5cGUiOiJhZGQiLCJpZCI6Ik8/X0RnJF9QTS9BcytlYD19TS42IiwiaW5wdXRzIjp7ImluMCI6eyJzaGFkb3ciOnsidHlwZSI6Im4iLCJpZCI6Ik8ySUNVXWhIJXlBI2BkaV8ufngxIiwiZmllbGRzIjp7Ik5VTSI6IjAifX0sImJsb2NrIjp7InR5cGUiOiJsYW1iZGEiLCJpZCI6IllDVmJ1anw4Lk8lYWh5RlNlRiN+IiwiaW5wdXRzIjp7ImlucHV0Ijp7ImJsb2NrIjp7InR5cGUiOiJtdWwiLCJpZCI6ImVpNGslOlRxVnA3c0ZibFZbbjVIIiwiaW5wdXRzIjp7ImluMCI6eyJzaGFkb3ciOnsidHlwZSI6Im4iLCJpZCI6IjU2fDRFfGJqUkIzcz1aKG5wNCpiIiwiZmllbGRzIjp7Ik5VTSI6Ii43In19fSwiaW4xIjp7InNoYWRvdyI6eyJ0eXBlIjoibiIsImlkIjoifW5kOz8ySVAkXnY4dVshTW5jV1ciLCJmaWVsZHMiOnsiTlVNIjoiMSJ9fSwiYmxvY2siOnsidHlwZSI6ImRlbGF5IiwiaWQiOiIoKzZEOmBYVlVWUmFSbTNsWS57YiIsImlucHV0cyI6eyJpbiI6eyJzaGFkb3ciOnsidHlwZSI6Im4iLCJpZCI6Ijh1KC15X35RI2UqJVYoPVFqQSFkIiwiZmllbGRzIjp7Ik5VTSI6IjAifX0sImJsb2NrIjp7InR5cGUiOiJpbnB1dCIsImlkIjoidzpSSkAzT043PyRbLHVbSHRUISMiLCJmaWVsZHMiOnsibmFtZSI6IngifX19LCJ0aW1lIjp7InNoYWRvdyI6eyJ0eXBlIjoibiIsImlkIjoiLFdSZGZRTGp3cWFBe0s9aj0xcDYiLCJmaWVsZHMiOnsiTlVNIjoiLjIifX19fX19fX19fX19LCJpbjEiOnsic2hhZG93Ijp7InR5cGUiOiJuIiwiaWQiOiJdPXg3aXZCY3BgOWNlZERGTjZ3NCIsImZpZWxkcyI6eyJOVU0iOiIwIn19LCJibG9jayI6eyJ0eXBlIjoibXVsIiwiaWQiOiJEPXhkVm5tTSFVN3RYeDJQZD1GXiIsImlucHV0cyI6eyJpbjAiOnsic2hhZG93Ijp7InR5cGUiOiJuIiwiaWQiOiJAUWhoTUZseipMVmlfTjZRL2d8fiIsImZpZWxkcyI6eyJOVU0iOiIxIn19LCJibG9jayI6eyJ0eXBlIjoic2luZSIsImlkIjoiNnt4PVRILVhxK2lRXmpBfnBGXVYiLCJpbnB1dHMiOnsiZnJlcSI6eyJzaGFkb3ciOnsidHlwZSI6Im4iLCJpZCI6IiVII0IuT0hMQFFvKkRoT2VqXWNoIiwiZmllbGRzIjp7Ik5VTSI6IjIwMCJ9fX0sInN5bmMiOnsic2hhZG93Ijp7InR5cGUiOiJuIiwiaWQiOiJxRS47Y3NbLjB6a1dHJH1IW3I9YiIsImZpZWxkcyI6eyJOVU0iOiIwIn19fSwicGhhc2UiOnsic2hhZG93Ijp7InR5cGUiOiJuIiwiaWQiOiJkbFQzdlM/OV98Tntbclo6NFYqSCIsImZpZWxkcyI6eyJOVU0iOiIwIn19fX19fSwiaW4xIjp7InNoYWRvdyI6eyJ0eXBlIjoibiIsImlkIjoiYHBVZzNrYkFSJUdtUTF2TmksX1ciLCJmaWVsZHMiOnsiTlVNIjoiMSJ9fSwiYmxvY2siOnsidHlwZSI6ImFkIiwiaWQiOiJ2IVFSSlcyUGZYdm9Jb2YjSiVJTiIsImlucHV0cyI6eyJ0cmlnIjp7InNoYWRvdyI6eyJ0eXBlIjoibiIsImlkIjoiZyl9aFBTPVQ1aCt9fFgwUkAjclgiLCJmaWVsZHMiOnsiTlVNIjoiMCJ9fSwiYmxvY2siOnsidHlwZSI6ImltcHVsc2UiLCJpZCI6IkkvVlR+fkx5RHhiQnB+fCFFcV59IiwiaW5wdXRzIjp7ImZyZXEiOnsic2hhZG93Ijp7InR5cGUiOiJuIiwiaWQiOiJdYjI0R18zJFdYTCpEOW4qejd3WCIsImZpZWxkcyI6eyJOVU0iOiIxIn19fSwicGhhc2UiOnsic2hhZG93Ijp7InR5cGUiOiJuIiwiaWQiOiJOflZNWG1sKkU4c2h5I2csIVdCZiIsImZpZWxkcyI6eyJOVU0iOiIwIn19fX19fSwiYXR0Ijp7InNoYWRvdyI6eyJ0eXBlIjoibiIsImlkIjoiRS9fN19WaUlNfHIqV2U1PXQ7S3ciLCJmaWVsZHMiOnsiTlVNIjoiMC4wMiJ9fX0sImRlYyI6eyJzaGFkb3ciOnsidHlwZSI6Im4iLCJpZCI6IldSM2NxOEV9MFlJe0cvZFFqLThpIiwiZmllbGRzIjp7Ik5VTSI6IjAuMSJ9fX19fX19fX19fX19fV19fQ==)
- feel free add your own by sending a PR :) i'll accept anything
