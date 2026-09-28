<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default DiffEntry Options
    |--------------------------------------------------------------------------
    |
    | These values are used by every DiffEntry unless overridden with the
    | corresponding fluent method (e.g. ->outputFormat('line-by-line')).
    |
    */

    // 'side-by-side' or 'line-by-line'
    'output_format' => 'side-by-side',

    // 'lines', 'words' or 'none'
    'matching' => 'lines',

    // Whether to draw the diff2html file list above the diff.
    'draw_file_list' => false,

    // Whether to hide the ADDED/CHANGED/DELETED/RENAMED file tags.
    'hide_file_tags' => false,

    // 'filament' (follows the panel's dark mode), 'light', 'dark' or 'auto' (follows the OS setting)
    'color_scheme' => 'filament',

];
