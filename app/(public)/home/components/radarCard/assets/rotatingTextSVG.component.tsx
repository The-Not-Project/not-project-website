export default function RotatingTextSVG({ borough }: { borough: string }) {
  return (
    <svg viewBox="0 0 300 300" aria-hidden="true" className="circle">
      <defs>
        <path
          id="circlePath"
          d="
                    M 150,150
          m -100,0
          a 100,100 0 1,1 200,0
          a 100,100 0 1,1 -200,0
        "
        />
      </defs>

      <text>
        <textPath href="#circlePath">
          • {borough} • New York •
        </textPath>
      </text>
    </svg>
  );
}
