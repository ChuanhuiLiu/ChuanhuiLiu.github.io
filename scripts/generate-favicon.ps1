param(
  [string]$OutputDir = "assets/images/favicon"
)

$ErrorActionPreference = "Stop"

Add-Type -AssemblyName PresentationCore, PresentationFramework, WindowsBase

function Get-Color {
  param([string]$Hex)
  return [System.Windows.Media.Color]([System.Windows.Media.ColorConverter]::ConvertFromString($Hex))
}

function New-RenderTargetBitmap {
  param([int]$Size)

  $visual = [System.Windows.Media.DrawingVisual]::new()
  $dc = $visual.RenderOpen()

  $rect = [System.Windows.Rect]::new(0, 0, $Size, $Size)
  $radius = [double]($Size * 0.22)

  $background = [System.Windows.Media.LinearGradientBrush]::new()
  $background.StartPoint = [System.Windows.Point]::new(0, 0)
  $background.EndPoint = [System.Windows.Point]::new(1, 1)
  $background.GradientStops.Add([System.Windows.Media.GradientStop]::new((Get-Color "#0f172a"), 0.0))
  $background.GradientStops.Add([System.Windows.Media.GradientStop]::new((Get-Color "#1d4ed8"), 0.62))
  $background.GradientStops.Add([System.Windows.Media.GradientStop]::new((Get-Color "#0891b2"), 1.0))

  $dc.DrawRoundedRectangle($background, $null, $rect, $radius, $radius)

  $glowBrush = [System.Windows.Media.RadialGradientBrush]::new()
  $glowBrush.Center = [System.Windows.Point]::new(0.25, 0.18)
  $glowBrush.GradientOrigin = [System.Windows.Point]::new(0.25, 0.18)
  $glowBrush.RadiusX = 0.9
  $glowBrush.RadiusY = 0.9
  $glowBrush.GradientStops.Add([System.Windows.Media.GradientStop]::new([System.Windows.Media.Color]::FromArgb(82, 255, 255, 255), 0.0))
  $glowBrush.GradientStops.Add([System.Windows.Media.GradientStop]::new([System.Windows.Media.Color]::FromArgb(0, 255, 255, 255), 1.0))
  $dc.DrawRoundedRectangle($glowBrush, $null, $rect, $radius, $radius)

  $borderPen = [System.Windows.Media.Pen]::new(
    [System.Windows.Media.SolidColorBrush]::new([System.Windows.Media.Color]::FromArgb(90, 186, 230, 253)),
    [double]($Size * 0.045)
  )
  $dc.DrawRoundedRectangle($null, $borderPen, $rect, $radius, $radius)

  $accentBrush = [System.Windows.Media.LinearGradientBrush]::new()
  $accentBrush.StartPoint = [System.Windows.Point]::new(0, 0)
  $accentBrush.EndPoint = [System.Windows.Point]::new(1, 1)
  $accentBrush.GradientStops.Add([System.Windows.Media.GradientStop]::new((Get-Color "#f8fafc"), 0.0))
  $accentBrush.GradientStops.Add([System.Windows.Media.GradientStop]::new((Get-Color "#dbeafe"), 1.0))

  $typeface = [System.Windows.Media.Typeface]::new("Georgia")
  $formatted = [System.Windows.Media.FormattedText]::new(
    "CL",
    [System.Globalization.CultureInfo]::InvariantCulture,
    [System.Windows.FlowDirection]::LeftToRight,
    $typeface,
    [double]($Size * 0.46),
    $accentBrush,
    96
  )
  $x = ($Size - $formatted.WidthIncludingTrailingWhitespace) / 2
  $y = ($Size - $formatted.Height) / 2 - ($Size * 0.02)
  $dc.DrawText($formatted, [System.Windows.Point]::new($x, $y))

  $sparkPen = [System.Windows.Media.Pen]::new(
    [System.Windows.Media.SolidColorBrush]::new([System.Windows.Media.Color]::FromArgb(185, 125, 211, 252)),
    [double]($Size * 0.05)
  )
  $sparkStart = [System.Windows.Point]::new($Size * 0.77, $Size * 0.2)
  $sparkEnd = [System.Windows.Point]::new($Size * 0.87, $Size * 0.1)
  $dc.DrawLine($sparkPen, $sparkStart, $sparkEnd)
  $dc.DrawLine($sparkPen, [System.Windows.Point]::new($Size * 0.82, $Size * 0.05), [System.Windows.Point]::new($Size * 0.82, $Size * 0.25))

  $dc.Close()

  $bitmap = [System.Windows.Media.Imaging.RenderTargetBitmap]::new(
    $Size,
    $Size,
    96,
    96,
    [System.Windows.Media.PixelFormats]::Pbgra32
  )
  $bitmap.Render($visual)
  return $bitmap
}

function Save-Png {
  param(
    [System.Windows.Media.Imaging.BitmapSource]$Bitmap,
    [string]$Path
  )

  $encoder = [System.Windows.Media.Imaging.PngBitmapEncoder]::new()
  $encoder.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($Bitmap))
  $stream = [System.IO.File]::Open($Path, [System.IO.FileMode]::Create)
  try {
    $encoder.Save($stream)
  }
  finally {
    $stream.Dispose()
  }
}

function Save-IcoFromPng {
  param(
    [string]$PngPath,
    [string]$IcoPath,
    [byte]$Size
  )

  $pngBytes = [System.IO.File]::ReadAllBytes($PngPath)
  $stream = [System.IO.File]::Open($IcoPath, [System.IO.FileMode]::Create)
  $writer = [System.IO.BinaryWriter]::new($stream)

  try {
    $writer.Write([UInt16]0)
    $writer.Write([UInt16]1)
    $writer.Write([UInt16]1)

    $writer.Write([byte]$Size)
    $writer.Write([byte]$Size)
    $writer.Write([byte]0)
    $writer.Write([byte]0)
    $writer.Write([UInt16]1)
    $writer.Write([UInt16]32)
    $writer.Write([UInt32]$pngBytes.Length)
    $writer.Write([UInt32]22)
    $writer.Write($pngBytes)
  }
  finally {
    $writer.Dispose()
    $stream.Dispose()
  }
}

New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null

$assets = @(
  @{ Size = 32; File = "favicon-32x32.png" },
  @{ Size = 96; File = "favicon-96x96.png" },
  @{ Size = 180; File = "apple-touch-icon.png" },
  @{ Size = 192; File = "web-app-manifest-192x192.png" },
  @{ Size = 512; File = "web-app-manifest-512x512.png" }
)

foreach ($asset in $assets) {
  $bitmap = New-RenderTargetBitmap -Size $asset.Size
  Save-Png -Bitmap $bitmap -Path (Join-Path $OutputDir $asset.File)
}

Save-IcoFromPng -PngPath (Join-Path $OutputDir "favicon-32x32.png") -IcoPath (Join-Path $OutputDir "favicon.ico") -Size 32
