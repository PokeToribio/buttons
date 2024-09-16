# Discord Bot - Roxy Migurdia

Este repositorio contiene el código para un bot de Discord llamado Roxy Migurdia. El bot utiliza la biblioteca `discord.js` y soporta comandos slash y botones interactivos. Está diseñado para ser modular, permitiendo añadir comandos y manejar interacciones de manera organizada.

## Estructura del Proyecto

- **`/commands`**: Contiene los comandos del bot organizados en subcarpetas por categoría.
- **`/executes`**: Contiene los manejadores de interacciones, como botones.
- **`/events`**: Contiene los eventos de Discord, como el evento `ready`.
- **`/utils`**: Contiene utilidades como el script para registrar comandos (`deploycommands.js`).
- **`.env`**: Archivo para variables de entorno (asegúrate de no subirlo a repositorios públicos).
- **`index.js`**: Archivo principal para iniciar el bot.
- **`package.json`**: Archivo de configuración de npm con dependencias del proyecto.

## Configuración

1. Clona este repositorio:
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
    ```plaintext
    TOKEN=your-bot-token
    CLIENT_ID=your-bot-client-id
    GUILD_ID=your-guild-id
    ```

4. Registra los comandos:
    ```bash
    npm run deploy-commands
    ```

5. Inicia el bot:
    ```bash
    npm start
    ```

## Contribución

Si deseas contribuir al proyecto, siéntete libre de hacer un fork y enviar un pull request con tus cambios.

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).

## Contacto

Para cualquier consulta, por favor contacta a [tu-email@dominio.com](mailto:tu-email@dominio.com).
