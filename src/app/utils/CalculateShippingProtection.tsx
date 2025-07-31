export default function calculateShippingProtection(quantity:number) {
  let cost = 4.99;
  const increment = 5.00;
  let current = "odd";
  if (quantity===0) return cost;
  if (quantity=== 1 || quantity===2) return cost;

  for (let i=2; i<=quantity; i++) {
    if (i%5===0) {
      cost+=increment;
      current = current === "even" ? "odd" : "even";
    } else if ((current==="even" && i%2===0)|| (current==="odd" && i%2===1)) {
      cost+=increment;
    }
  };
  return cost.toFixed(2);
}