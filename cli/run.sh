#!/bin/bash

echo "Sugerido"
for i in {1..30}; do
    node run-knn-sugerido.js "test-$i"
done | sort
echo "Metodo 2"
for i in {1..30}; do
    node run-knn-metodo-2.js "test-$i"
done | sort

