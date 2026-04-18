Add-Type -AssemblyName System.Windows.Forms
$img = [System.Windows.Forms.Clipboard]::GetImage()
if ($img) {
    $img.Save("C:/work/projects/gajumaru-dental-presite/images/logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Saved: $($img.Width)x$($img.Height)"
} else {
    Write-Host "No image in clipboard"
}
