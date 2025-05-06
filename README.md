# ring76-com

## Ring 76 - San Diego Magic Club Website

This repository contains the website for Ring 76, the San Diego chapter of the International Brotherhood of Magicians.

## Development Setup

### Prerequisites

- Docker and Docker Compose installed on your machine
- Git

### Getting Started

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd ring76-com
   ```

2. Start the Docker containers:

   ```bash
   docker-compose up -d
   ```

3. Access the website: Open your browser and navigate to `http://localhost:8080`

### Project Structure

- `src/` - Contains all website source files
  - `index.php` - Main entry point
  - `includes/` - PHP include files for the site sections
  - `css/` - Stylesheet files
  - `js/` - JavaScript files
  - `images/` - Image assets

### Making Changes

1. Edit files in the `src/` directory
2. Refresh your browser to see changes (no build step needed)

### Stopping the Environment

```bash
docker-compose down
```

## Deployment

For production deployment, configure your web server to serve the contents of the `src/` directory.

To deploy, you can use the following command:

```bash
./upload.sh
```
