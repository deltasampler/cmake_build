set(
    PROJECT_SOURCE
    "source/main.cpp"
)

add_executable(project ${PROJECT_SOURCE})

if(CMAKE_VERSION VERSION_GREATER 3.12)
    set_property(TARGET project PROPERTY CXX_STANDARD 20)
endif()
