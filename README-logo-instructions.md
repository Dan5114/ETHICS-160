# Logo Replacement Instructions

This document provides instructions on how to properly replace the University of St. La Salle logo in the application.

## Current Setup

The application is currently configured to use `/images/usls-logo.png` for the logo in the navigation bar. However, the image files in `public/images/` are currently empty (0 bytes).

## Steps to Replace the Logo

1. **Prepare Your Logo Image**
   - Ensure you have the exact logo image you want to use
   - The image should be in PNG format for best compatibility
   - Recommended size: 100x100 pixels or larger with a 1:1 aspect ratio

2. **Replace the Current Logo Files**
   - Replace `public/images/usls-logo.png` with your actual logo image
   - If you also have an SVG version, replace `public/images/usls-logo.svg` as well

3. **Verify the Logo Works**
   - After replacing the files, restart the development server
   - Check that the logo displays correctly in the navigation bar

## Command to Replace the Logo (Windows)

If you have your logo image ready, you can use the following command to replace the current empty file:

```cmd
copy "path\to\your\logo.png" "public\images\usls-logo.png"
```

## Command to Replace the Logo (Unix/Linux/Mac)

```bash
cp path/to/your/logo.png public/images/usls-logo.png
```

## Verification

After replacing the logo file:
1. Ensure the file is not empty (should have a size greater than 0 bytes)
2. Restart your development server
3. Check the navigation bar to confirm the logo displays correctly

The current implementation in `resources/js/Layouts/AuthenticatedLayout.tsx` is already set up to use the image file correctly:

```jsx
<img 
  src="/images/usls-logo.png" 
  alt="University of St. La Salle Bacolod" 
  className="h-12 w-auto"
/>
```

This approach ensures that when someone pulls the codebase to a different device, they will only need to replace the image files in the `public/images/` directory to get the correct logo displayed.
