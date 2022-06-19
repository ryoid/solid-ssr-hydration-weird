export const Page = () => (
  <>
    <div>Foo</div>
    {/* Wrap this with any element like `<span>` and then the bug goes away */}
    Bar
    <div>Baz</div>
  </>
);
