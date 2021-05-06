// TODO: investigate if React.lazy makes a better experience than @loadable/component?
import loadable from "@loadable/component";
import { RouteComponentProps } from "react-router-dom";

export interface LoadableViewProps extends RouteComponentProps {
  view: string;
}

/**
 * Use @loadable/component for route-based code-splitting
 * @see https://reacttraining.com/react-router/web/guides/code-splitting
 *
 * NOTE: module resolution here is a bit different from the rest of the applications
 * and full-dynamic import only work with relative paths
 *
 * This is not exactly an alternative to React.lazy, even though the use-case is pretty close
 * @see https://loadable-components.com/docs/loadable-vs-react-lazy/
 */
const LoadableView = loadable(
  (props: LoadableViewProps) => import(`../views/${props.view}/index`)
);

export default LoadableView;
