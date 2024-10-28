import { render, screen } from "@testing-library/react";
import Toppings from ".";
import userEvent from "@testing-library/user-event";

test("sosları ekleme ve çıkarma işlemlerinin toplam fiyata etkisi", async () => {
  const user = userEvent.setup();

  // bileşeni renderla
  render(<Toppings />);

  // toplam spanı al ( soslar ücreti toplamı)
  const total = screen.getByTestId("total");

  // tüm sosları al
  const cards = await screen.findAllByTestId("card");

  // başlangıçta toplam 0 mı kontrol et
  expect(total).toHaveTextContent(/^0$/);

  // bir sosa tıkla
  await user.click(cards[3]);

  // toplam 3 oldu mu kontrol et
  expect(total).toHaveTextContent(/^3$/);

  // farklı bir sosa tıkla
  await user.click(cards[5]);

  // toplam 6 oldu mu kontrol et
  expect(total).toHaveTextContent(/^6$/);

  // tıklanan soslardan birine tekrar tıkla
  await user.click(cards[5]);

  // toplam 3 oldu mu kontrol et
  expect(total).toHaveTextContent(/^3$/);

  // tıklanan soslardan diğerine tekrar tıkla
  await user.click(cards[3]);

  // toplam 0 oldu mu kontrol et
  expect(total).toHaveTextContent(/^0$/);
});

test("soslar sepete eklendiği zaman active class'ı alır", async () => {
  const user = userEvent.setup();

  // bileşeni renderla
  render(<Toppings />);

  // bütün cardları al
  const cards = await screen.findAllByTestId("card");

  // bütün kartların active class'ına sahip olmadığından emin ol
  cards.forEach((card) => expect(card).not.toHaveClass("active"));

  // m&m kartına tıkla
  await user.click(cards[0]);

  // m&m kartı active class'ına sahip mi kontrol et
  expect(cards[0]).toHaveClass("active");

  // m&m kartına tekrar tıkla
  await user.click(cards[0]);

  // m&m kartı active class'ına sahip değil mi kontol et
  expect(cards[0]).not.toHaveClass("active");
});
