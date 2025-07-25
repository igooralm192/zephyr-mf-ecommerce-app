# E-commerce App - Zephyr & Module Federation

E-commerce application demonstrating Module Federation with Rspack and Zephyr.

The purpose of this application is to demonstrate the runtime loading of remote modules using Module Federation. Furthermore, it shows how to use Zephyr to manage the deployment of the application.

## Architecture
- **Host (ecommerce_home)**: Main application with cart
- **Remote (ecommerce_products)**: Product catalog

## Technologies
- React 18, TypeScript, Zustand, TailwindCSS
- Module Federation with Rspack
- Zephyr for deploy management