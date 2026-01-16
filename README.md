# Fronend-Angular
To install Angular, you need to set up its Command Line Interface (CLI) on your computer. This requires Node.js to be installed first, as Angular uses the Node Package Manager (npm) to manage its tools.

Step 1: Install Node.js
Angular requires an active LTS (Long Term Support) version of Node.js.

Go to the official Node.js website.

Download and install the version labeled "LTS".

To verify the installation, open your terminal (or Command Prompt) and type:

node -v

npm -v

Step 2: Install Angular CLI
Once Node.js is ready, you can install the Angular CLI globally so you can use the ng command anywhere on your system.

Command: npm install -g @angular/cli

Note for macOS/Linux: If you get a permission error, you may need to add sudo at the beginning: sudo npm install -g @angular/cli.

Step 3: Verify the Installation
Check that Angular is installed correctly by running:

Command: ng version (or ng v)

Step 4: Create Your First Project

ng new my-app (Follow the prompts for CSS and Routing).

Step 5: Generating Code

ng g c <name> – Create a Component (UI element).

ng g s <name> – Create a Service (Data/Logic).

Step 6: Running The App

cd my-app

ng serve --open (run it locally)

ng build (Compiles the app into the /dist folder for hosting)

# Apis





