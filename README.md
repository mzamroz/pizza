# Pizza Piccola

Gra przeglądarkowa o komponowaniu pizzy, z polskim interfejsem i autorską grafiką rysowaną w Canvas. Bez instalowania zależności.

## Uruchomienie

Wymagany Node.js 18 lub nowszy.

```sh
npm run dev
```

Otwórz http://localhost:5173. Testy logiki gry: `npm test`.

## Rozgrywka

- Wybierz składnik i klikaj na pizzy albo przeciągaj dodatki z zasobnika.
- Realizuj kolejne zamówienia. Zgodność ilości składników i ich równomierne rozłożenie wpływają na ocenę oraz monety.
- Cofaj ruchy, usuwaj pojedyncze składniki lub wyczyść placek. Czyszczenie też można cofnąć.
- Kliknij „Do pieca!”, odbierz wynik i przejdź do następnego klienta.
- Tryb „Gotuj po swojemu” pozwala tworzyć bez ocen. Przełączanie trybów zachowuje niedokończone pizze w pamięci bieżącej sesji.
- Monety i liczba obsłużonych zamówień zapisują się lokalnie w przeglądarce.
- Klawiatura: Tab i Enter wybierają składniki; strzałki przesuwają kursor na pizzy; Enter dodaje; Ctrl/Command+Z cofa. Opcjonalny dźwięk w stopce.

Grafika i dźwięki są generowane lokalnie. Opcjonalne fonty Google mają systemowe zamienniki, więc gra działa także bez dostępu do internetu po załadowaniu plików z lokalnego serwera. Nie wymaga konta ani backendu.
