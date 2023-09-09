import { Collapse, Input, Loader, ChevronIcon } from "@mantine/core";
import { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleDown,
  faHandPointLeft,
  faMinusSquare,
  faPenToSquare,
  faPlusSquare,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import dfs from "./j/file";
// import _ from 'lodash';

function AddRole() {
  const dispatch = useDispatch();
  const { Tree, isLoading } = useSelector((state) => state.Tree);
  // const TempTree = {};

  // const [Tree, setTree] = useState();
  // const [Tree2, setTree2] = useState();
  const [TempTree, setTempTree] = useState();
  const [loading, setLoading] = useState(true);
  const [chosen, setChosen] = useState(false);
  const [chosenNode, setChosenNode] = useState();
  const [nodeParent, setNodeParent] = useState();
  const [chosenIndex, setChosenIndex] = useState();
  const [updated, setUpdated] = useState();
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [editNode, setEditNode] = useState();
  const [nodeChildren, setNodeChildren] = useState();
  const [search, setSearch] = useState("");
  const [renderedTree, setRenderedTree] = useState(false);
  const [desc, setDesc] = useState("");
  const [topNode, setTopNode] = useState();
  const [topNodeParent, setTopNodeParent] = useState();
  const [allCollapse, setAllCollapse] = useState(true);

  const SearchRef = useRef();
  interface t {
    value: string;
    id: number;
    description: string;
    children: t[];
  }

  useEffect(() => {
    setTempTree(dfs());
  },[])

  const folded = (node: t) => {
    if (search != "") {
      if (!node.value.includes(search)) {
        return true;
      }
      return false;
    } else {
      return true;
    }
  };

  const tt = (node) => {
    if (search != "") {
      if (!node.value.includes(search)) {
        return true;
      }
      return false;
    }
  };

  const ChildNode = ({ child, prefix, childNum, childLength, node }) => {
    const [close, setClose] = useState(true);
    const [hover, setHover] = useState();

    let childPrefix: string = "";
    if (childNum) {
      if (childNum > 1) {
        childPrefix = prefix + "  |   ";
      } else {
        childPrefix = prefix + "      ";
      }
    }
    return isRender(
      child,
      false,
      childPrefix,
      childLength,
      node,
      close,
      setClose,
      hover,
      setHover,
      num
    );
  };

  let num = 0;
  const [Hover, setHover] = useState(true);


  let topArray = useMemo(() => [], [search]);
  const [arrayStart, setArrayStart] = useState(false);

  useEffect(() => {
    if (search == "") {
      setArrayStart(false);
    }
  }, [search]);

  const InputElement = useMemo(() => {
    return (
      <Input
        placeholder={"Search"}
        className="w-[500px] mb-5"
        // value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            console.log("enter clicked");
            setArrayStart(true);
          }
        }}
      />
    );
  }, []);

  const SearchArray = useMemo(() => {
    return function searchGen(el) {
      return (
        <div className="mb-3">
          <div className={"inline hover:cursor-default text-gray-700"}>
            <h1>
              {el[0].value}
            </h1>
          </div>
        </div>
      );
    };
  }, [arrayStart]);

  const isRender = useMemo(() => {
    return function dfs(
      node: t,
      isRoot = true,
      prefix = "",
      childNum?: number,
      parent: t,
      closeBtn = true,
      toggle: CallableFunction,
      hover: boolean,
      hoverSet: CallableFunction,
      number: number = 0
    ) {


      const children = node.children.map((child, i) => {
        const childLength = node.children.length;

        return (
          <ChildNode
            key={i}
            child={child}
            prefix={prefix}
            childNum={childNum}
            childLength={childLength}
            node={node}
          />
        );
      });

      return (
        <div key={node.value} className="w-full">
          {isRoot && (
            <div
              className={
                search == ""
                  ? "inline hover:cursor-default text-gray-700"
                  : tt(node)
                  ? "inline hover:cursor-default text-gray-700"
                  : "inline hover:cursor-default text-gray-700 bg-red-300"
              }
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <h1 className="hover:text-gray-900 hover:pl-1 transition-all transition-duration-200ms">
                {"  "}
                {node.value}
              </h1>
              <div
                className={`inline ml-3 transition-all opacity-25 hover:opacity-100`}
              >
                <span
                  className="hover:cursor-pointer font-bold text-black pl-3 rounded-full border-1 border-gray-400"
                  onClick={() => {
                    setChosen(true);
                    setShowDelete(false);
                    setShowEdit(false);
                    setChosenNode(node);
                  }}
                >
                  <FontAwesomeIcon icon={faPlusSquare} />
                </span>{" "}
                <span
                  className="hover:cursor-pointer  text-black font-bold pl-4 rounded-full border-1 border-gray-400"
                  onClick={() => {
                    setShowEdit(true);
                    setShowDelete(false);
                    setChosen(false);
                    setEditNode(node);
                    setNodeParent(parent);
                  }}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </span>
                {/* <FontAwesomeIcon
              icon={faCircleDown}
              className="pl-5 opacity-50"
              onClick={() => toggle((state) => !state)}
            /> */}
              </div>
            </div>
          )}
          <span className="text-gray-600">{!isRoot && prefix + "  └──"}</span>
          {!isRoot && (
            <div
              className={
                search == ""
                  ? "inline hover:cursor-default text-gray-700"
                  : tt(node)
                  ? "inline hover:cursor-default text-gray-700"
                  : "inline hover:cursor-default text-gray-700 bg-red-300"
              }
              onMouseEnter={() => {
                setDesc(node.description);
                hoverSet(true);
              }}
              onMouseLeave={() => {
                hoverSet(false);
              }}
            >
              {node.children.length != 0 && (
                <ChevronIcon
                  className={
                    closeBtn == true
                      ? "inline mr-2 ml-2"
                      : "inline mr-2 ml-2 rotate-180"
                  }
                  onClick={() => toggle((state) => !state)}
                />
              )}
              <h1
                className="hover:text-gray-900 hover:pl-2 transition-all transition-duration-200ms"
              >
                {"  "}
                {node.value}
              </h1>
            </div>
          )}
          <Collapse in={folded(node)}>
            <Collapse in={closeBtn}>
              <pre>{children}</pre>
            </Collapse>
          </Collapse>
        </div>
      );
    };
  }, [TempTree, search, arrayStart, allCollapse]);

  if (loading) {
    return (
      <div className="flex w-full h-[100vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className="h-full flex z-1 ">
        <div className="min-h-[100vh] leading-[30px] flex-1 pl-5 text-gray-700 tracking-wide text-md flex  pt-5">
          <div className="pl-[5%] pt-[2%]">
            {InputElement}
            {arrayStart && (
              <div className=" border border-gray-300 px-5 flex flex-col">
                <p
                  className="text-xl place-self-end ml-3 hover:cursor-pointer"
                  onClick={() => setSearch("")}
                >
                  x
                </p>
                {topArray.map((el) => SearchArray(el))}
              </div>
            )}
            {/* <input
              type="checkbox"
              checked={allCollapse}
              onChange={(e) => setAllCollapse(e.target.checked)}
            /> */}
            {isRender(TempTree)}
          </div>
        </div>
        <div
          className="flex-1 flex flex-col justify-center items-center border-l"
          onMouseEnter={() => setDesc("")}
        >
          Here
        </div>
      </div>
    </div>
  );
}

export default AddRole;
