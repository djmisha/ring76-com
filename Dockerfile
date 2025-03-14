FROM php:8.2-apache

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Install dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install zip

# Set working directory
WORKDIR /var/www/html

# Configure Apache - ensure .php files are processed
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
RUN echo '<Directory /var/www/html/>\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>' > /etc/apache2/conf-available/docker-php.conf

# Make sure the PHP module is enabled
RUN a2enconf docker-php

# Expose port 80
EXPOSE 80

# Start Apache in foreground
CMD ["apache2-foreground"]
