{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
    nativeBuildInputs = with pkgs; [ 
        nodejs-16_x
        (yarn.override { nodejs = nodejs-16_x; })
    ];
}
