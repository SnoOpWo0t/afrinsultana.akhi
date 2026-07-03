import { SVGProps } from "react";

export default function LinktreeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M13.736 5.853l4.005-4.117 2.325 2.38-4.2 4.005h5.908v3.305h-5.937l4.229 4.108-2.325 2.334-5.74-5.469v10.37h-3.32V12.4l-5.74 5.469-2.325-2.334 4.229-4.108H.829V8.121h5.908l-4.2-4.005 2.325-2.38 4.005 4.117V.306h3.32v5.547z" />
    </svg>
  );
}
