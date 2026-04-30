# Practica Canvas - Metricas y Performance

## Objetivo
Documentar el comportamiento de la animacion del canvas y registrar las metricas obtenidas desde DevTools.

## Como obtener los datos en Performance
1. Abrir la pagina en el navegador.
2. Abrir DevTools con `F12`.
3. Ir a la pestaña `Performance`.
4. Presionar `Record`.
5. Interactuar con la practica durante 5 a 10 segundos.
6. Detener la grabacion con `Stop`.
7. Revisar los graficos de `Frames`, `Main`, `Scripting`, `Rendering` y `Painting`.

## Como interpretar los graficos
- `Frames`: muestra si la animacion mantiene una tasa estable. Si hay caidas, el movimiento se vera menos fluido.
- `Main`: indica carga del hilo principal. Si se satura, la pagina responde peor.
- `Scripting`: mide tiempo ejecutado por JavaScript. Si sube mucho, hay demasiada logica por frame.
- `Rendering`: refleja trabajo de estilo y calculo de layout. En canvas puro deberia ser bajo.
- `Painting`: representa el costo de dibujar en pantalla. Si aumenta, puede haber demasiados objetos o demasiada limpieza/redibujo.

## Metricas a registrar
Completa esta tabla despues de grabar una sesion de prueba.

| Medida | Valor | Observacion |
|---|---:|---|
| FPS promedio |  |  |
| FPS minimo |  |  |
| FPS maximo |  |  |
| Tiempo total de grabacion |  |  |
| Tiempo en Scripting |  |  |
| Tiempo en Rendering |  |  |
| Tiempo en Painting |  |  |
| Numero de listeners activos |  |  |

## Recomendaciones de analisis
- Si el FPS baja cuando aumentan las particulas, el costo esta en el renderizado.
- Si `Scripting` domina, hay demasiada logica en `requestAnimationFrame`.
- Si hay listeners duplicados o huérfanos, revisa que los eventos se registren una sola vez y se eliminen al salir.
- Si el canvas redibuja demasiado, revisa el numero de particulas y el uso de gradientes o arcos.

## Notas de la practica
- La animacion usa `requestAnimationFrame`.
- El movimiento se calcula con `dt` para mantener uniformidad.
- El cambio de tema se hace con clases CSS.
- Se muestra un contador de FPS para seguimiento rapido.

